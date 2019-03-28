---
$title: Include images & video
$order: 8
$categories: "interactivity-dynamic-content"
description: "Like on a normal HTML page, AMP allows you to embed images, video and audio content. Learn what's different about the AMP equivalents and learn how to..."
$path: /documentation/guides-and-tutorials/develop/media_iframes_3p/amp_replacements.html
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Like on a normal HTML page, AMP allows you to embed **images**, **video** and **audio**
content. Learn what's different about the AMP equivalents and learn how to
include them in your pages.

## Why not &lt;img>, &lt;video> and &lt;audio>?

AMP doesn't support the default HTML counterparts to displaying media, like `<img>`.
We provide equivalent components for the following reasons:

* We need to understand layout of the page before assets load, crucial
  to [support first-viewport preloading]({{g.doc('/content/amp-dev/about/how-amp-works.html', locale=doc.locale).url.path}}#size-all-resources-statically)
* We need to control network requests to [lazy load and prioritize resources
effectively]({{g.doc('/content/amp-dev/about/how-amp-works.html', locale=doc.locale).url.path}}#prioritize-resource-loading)

Caution: While they're not supported, they *will* render, but AMP won't [validate your pages]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/index.md', locale=doc.locale).url.path}}) and you won't get all the benefits AMP provides.

## Images

Include an image in your page
using the [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) element, like so:

<!--embedded example - fixed size image -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.fixed.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

In this most basic example, the image will display with the specified fixed
height and width. At minimum, an explicit width and height needs to be set.

#### Displaying images when JavaScript is disabled

As [`<amp-img>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) relies on JavaScript, if the user chooses to disable scripts, images won't display.  In this case, you should provide a fallback to the image using `<img>` and `<noscript>`, like so:

<!--embedded example - img with noscript -->
<div>
<amp-iframe height="215"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.noscript.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

### Advanced layouts

AMP makes it much easier than with standard CSS/HTML to create fully responsive
images. In its most basic form, all you have to do is to add `layout="responsive"`:

<!--embedded example - basic responsive image -->
<div>
<amp-iframe height="193"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

[tip type="read-on"]
**READ ON –**  Learn more about [advanced layout techniques]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md', locale=doc.locale).url.path}}).
[/tip]

### Behavior and placeholders

The AMP HTML runtime can effectively manage image resources,
choosing to delay or prioritize resource loading
based on the viewport position, system resources, connection bandwidth, or other factors.

[tip type="read-on"]
**READ ON –**  Learn how to [provide fallbacks and placeholders for images]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}).
[/tip]

## Animated images

The [`amp-anim`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-anim.md', locale=doc.locale).url.path}}) element is very similar to the [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) element,
and provides additional functionality to manage loading and playing of animated images such as GIFs.

<!--embedded amp-anim basic example -->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

[tip type="note"]
**NOTE –**  Include `<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` in the head of your page to use this component.
[/tip]

## Video

Include a video in your page
using the [`amp-video`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-video.md', locale=doc.locale).url.path}}) element.

Only use this element for direct HTML5 video file embeds.
The element loads the video resource specified by the `src` attribute lazily,
at a time determined by AMP.

Include a placeholder before the video starts, and a fallback,
if the browser doesn't support HTML5 video, for example:

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

## Audio

Include an audio resource in your page,
using the [`amp-audio`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-audio.md', locale=doc.locale).url.path}}) element.

Only use this element for direct HTML5 audio file embeds.
Like all embedded external resources in an AMP page,
the element loads the audio resource specified by the `src` attribute lazily,
at a time determined by AMP.

Include a placeholder before the audio starts, and a fallback,
if the browser doesn't support HTML5 audio, for example:

<!--embedded audio example  -->
<div>
<amp-iframe height="314"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampaudio.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div>
</amp-iframe>
</div>

[tip type="note"]
**NOTE –**  Include `<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` in the head of your page to use this component.
[/tip]
