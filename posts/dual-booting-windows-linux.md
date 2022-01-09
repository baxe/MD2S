---
title: Experience setting up Windows/Linux dual boot
slug: dual-booting-windows-linux
tags: windows, linux, dual boot
time: 1641665774
---

# Experience setting up Windows/Linux dual boot

Now, I finally decided to get into the world of Linux. Mind, it's not like I felt any particular need to do so. Curiosity got the better of me, and 4 hours of research later I found the distro for me. Little did I know, that these 4 hours were just the begging of the work. Maybe there is something to the notion of "Linux is for those who want to work *on* their OS, not *with*".

## The Setup

My "workstation" is a 2021 model XPS 9510 with 1TB NVMe storage, 32GB DDR4 3200MHz memory, 11th gen i7 11800H CPU, and a completely unnecessary RTX 3050ti. Bit much? Yes. I got it for a steal though, so here we are.

I landed on Pop_OS! for my distro. Not for the name, I can tell you that much. Asking around in Discord servers I lurk, this was one of the first distro names to pop on my radar. Its "native" support for Nvidia drivers and hybrid GPUs on top of being Ubuntu-based was a good sell for someone who doesn't know what they're doing.

 allocated 20GB for root, 1GB for boot, 8GB for swap, and 200GB for home. The information you find on the big internet regarding this is all over the place and I'm certain these allocations are overkill. Another bit of information the internet is inconsistent on is GRUB. I think I narrowed down that "grub bad" is the sentiment, at least in my case. I use [rEFInd](https://www.rodsbooks.com/refind/) as my boot manager.

A small tidbit at the end regarding preparation before I ramble: for creating a bootable USB I used  [Ventoy](https://github.com/ventoy/Ventoy). It's a pretty good solution, and far better than most YouTube videos will suggest.

## The Tinkering

With everything booted and working, everything appears to be in good order. However, like most people who work on laptops (at least I hope most aren't hunchback couch potatoes), I use a laptop dock to get a much better working setup. So let's plug it in.

Now before I ramble through my annoyances of getting the DE set up for me, I do realize some of these issues come from GNOME, or at least I suspect they do, but this was supposed to be the "very noob-friendly" distro and I'm not about to go replacing it the very first thing I do.

The first notable issue is the display scaling. Now, I'm on a 4k monitor, and I love it, but 100% scaling is a bit small. The next step up is 200%. Too big. Well, shit. Fractional scaling to 150% with impact on performance? I guess my laptop can spare some power for my eyes. 150% seems good, aside from the extremely blurry text outside the OS UI. Solution: scaling 100%, enable large text under accessibility. ¯\ (ツ) /¯

Next issue(s): really bad screen tearing, sluggish experience, and laggy animations. I spent 2 hours researching and trying out different suggestions to combat this. CPU performance to high, disable hybrid graphics bla bla bla. Wayland. Wayland on. Pop on Wayland. What is it? No idea. Why is it disabled by default? No idea. Do I care? Not right now I don't.

## Conclusion

In short, I like it. The experience after getting over the first few hurdles is in general great. It takes a bit more research to get my development environment setup, and installing the various bits and bobs I need is not even close to as straightforward as the Linux cult has led me to believe. However, I'm willing to give it a go for a good while before I reevaluate.

Developing on Windows has gotten much better in recent years, but there is just something fresh and principally good about being on Linux.