const fs = require("fs");
const glob = require("glob");
const grayMatter = require("gray-matter");
const handlebars = require("handlebars");
const hljs = require("highlight.js");
const marked = require("marked");
const path = require("path");

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlight(code, { language: lang }).value;
  },
});

// Array of posts for index
let posts = [];

const parse = (name) => {
  const raw = fs.readFileSync(name, "utf8");
  const parsed = grayMatter(raw);
  const html = marked.parse(parsed.content);
  const lexer = marked.lexer(parsed.content);
  return { ...parsed, html, lexer };
};

const truncate = (content) => {
  return content.length > 250 ? content.substr(0, 250) + "…" : content;
};

const createPost = (source, data) => {
  const template = handlebars.compile(source);
  return template(data);
};

const processPost = (name, template) => {
  const file = parse(name);
  const date = new Date(file.data.time * 1000).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const description = truncate(
    file.lexer.find((element) => element.type == "paragraph").text
  );

  const built = createPost(template, {
    title: file.data.title,
    date: date,
    slug: file.data.slug,
    content: file.html,
    description: description,
    tags: file.data.tags,
  });
  fs.writeFileSync(
    path.resolve("public", "posts") + `/${file.data.slug}.html`,
    built
  );

  posts.push({
    title: file.data.title,
    slug: file.data.slug,
    description: description,
    date: date,
    time: new Date(file.data.time), // for sort
  });
};

const createIndex = (source, data) => {
  const template = handlebars.compile(source);
  return template(data);
};

const processIndex = (template) => {
  const built = createIndex(template, { posts: posts });
  fs.writeFileSync(path.resolve("public/index.html"), built);
};

const build = () => {
  const postTemplate = fs
    .readFileSync(path.resolve("template/post.html"))
    .toString();
  const files = glob.sync(path.resolve("posts") + "/**/*.md");

  files.forEach((file) => {
    processPost(file, postTemplate);
  });

  // Sort newest first
  posts.sort((x, y) => {
    return y.time - x.time;
  });

  const indexTemplate = fs
    .readFileSync(path.resolve("template/index.html"))
    .toString();
  processIndex(indexTemplate);
};

build();
