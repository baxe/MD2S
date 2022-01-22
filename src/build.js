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
const posts = [];

function parse(name) {
  let raw = fs.readFileSync(name, "utf8");
  let parsed = grayMatter(raw);
  let html = marked.parse(parsed.content);
  let lexer = marked.lexer(parsed.content);
  return { ...parsed, html, lexer };
};

function truncate(content) {
  return content.length > 250 ? content.substr(0, 250) + "…" : content;
};

function createPost(source, data) {
  let template = handlebars.compile(source);
  return template(data);
};

function processPost(name, template) {
  let file = parse(name);
  let date = new Date(file.data.time * 1000).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  let description = truncate(
    file.lexer.find((element) => element.type == "paragraph").text
  );

  let built = createPost(template, {
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

function createIndex(source, data) {
  let template = handlebars.compile(source);
  return template(data);
};

function processIndex(template) {
  let built = createIndex(template, { posts: posts });
  fs.writeFileSync(path.resolve("public/index.html"), built);
};

function build() {
  let postTemplate = fs
    .readFileSync(path.resolve("template/post.html"))
    .toString();
  let files = glob.sync(path.resolve("posts") + "/**/*.md");

  files.forEach((file) => {
    processPost(file, postTemplate);
  });

  // Sort newest first
  posts.sort((x, y) => {
    return y.time - x.time;
  });

  let indexTemplate = fs
    .readFileSync(path.resolve("template/index.html"))
    .toString();
  processIndex(indexTemplate);
};

build();
