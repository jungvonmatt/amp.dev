---
$title: Create responsive AMP pages
$order: 5
$categories: "interactivity-dynamic-content"
description: Responsive web design is about building fluid web pages that respond to your user's needs—pages that fit their device's screen size and orientation. You can achieve ...
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
  - youtube
author: bpaduch
contributors:
  - pbakaus
---

## Introduction

Responsive web design is about building fluid web pages that respond to your user's needs—pages that fit their device's screen size and orientation.  You can achieve this easily in AMP.  AMP supports all screen and device categories and provides built-in responsive components.

In this guide, we'll show you how you can easily implement these responsive fundamentals in AMP:

- [Controlling the viewport](#controlling-the-viewport)
- [Creating a responsive layout](#creating-a-responsive-layout)
- [Scaling media](#scaling-media-for-the-page)

[video src='https://www.youtube.com/watch?v=XDvbJ2apaiA' caption='Learn about responsive design in AMP from this video.']

## Controlling the viewport

To optimize your web page so the content scales and fits the browser window for any device, you need to specify a `meta` viewport element. The viewport element instructs the browser on how to scale and size the visible area (the viewport) of the web page.

But, what values should you use?  Well, in AMP, that's already spelled out for you.  As part of the [required markup]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md', locale=doc.locale).url.path}}#required-markup) for AMP pages, you need to specify the following viewport:

```html
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
```

These are the typical viewport settings that you'd use for a responsive site. Although `initial-scale=1` isn't required for a valid AMP page, it's recommended because it sets the zoom level to 1 when the page is first loaded.

## Creating a responsive layout

In responsive design, you can use CSS [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) queries to tailor the styling of your web page for various screen dimensions without having to alter the content of the page.  In AMP, you can continue to use those same CSS `@media` queries. Additionally, for finer control over an AMP element, you can specify the `media` attribute on the element. This is particularly useful when you need to either show or hide an element based on a media query. See the [Changing the art direction of an image](#changing-the-art-direction-of-an-image) section for an example that uses the `media` attribute.

Making each element resize to fit a screen can be tricky<sup><a href="#fn1" id="ref1">*</a></sup>.  However, in AMP, you can easily make an element responsive by just specifying the `"layout=responsive"` attribute along with the element's `width` and `height` attributes. When you apply the `responsive` layout to an element, that element will automatically resize to the width of its container element, and the height will change based on the aspect ratio specified by the element's `width` and `height`. Almost all AMP elements support a `responsive` layout; refer to the element's reference documentation to see which layouts are supported.

Even though you can easily make elements responsive with `"layout=responsive"`, you still must consider how your elements appear on all screen sizes--including desktop and tablet. A common mistake is to allow an image to take the full width of the screen, which stretches the image beyond its intended size, causing a poor experience for widescreen users.  By default, elements with `layout=responsive` will take the full width of the element's container, which is often unrestricted in width (ie., width=100%).  You can improve how images appear by simply restricting the width of the image's container. For example, by setting a "max-width" rule on the "body" or "main", you can restrict all images to a specific max width.

##### Example: Restricting width of responsive images

In the following example, we have a flowers image (640 x 427 px) that we want to display on all screen sizes, so we specified the `width` and `height`, and set the layout to `responsive`.

<div><amp-iframe height=213 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.basic-image.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Show full code</div><div placeholder></div></amp-iframe></div>

However, we want the image to not stretch beyond its intended size, so we set the `max-width` on the container to 700 px via custom CSS:

```html
<style amp-custom>
.resp-img {
    max-width: 700px;
  }
</style>
```

[tip type="read-on"]
**READ ON –** To learn more about the different layouts in AMP, see the [Layout & Media queries]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md', locale=doc.locale).url.path}}#the-layout-attribute) guide.
[/tip]

 <a id="fn1"></a>
[tip type="note"]
**Why is it tricky to make elements resize to fit the screen when I can easily do this with the `width=100%` style?**

The tricky part is having responsive elements render on the page without adversely affecting performance metrics or user experience.  Yes, you can easily get images to fit the screen with "width=100%" but there are performance hits.  The browser must download the image first to get the dimensions of the image, then resize the image appropriately for the screen size, and finally reflow and repaint the page.  In AMP,  the rendering path is optimized so that first the page is laid out, setting aside placeholders for the images based on the dimensions provided in [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) (using those numbers to establish aspect ratio), then the resources are downloaded, and the page is painted.  No reflow is required.
[/tip]

## Scaling media for the page

Probably the most challenging aspect of responsive design is displaying media correctly on the page so that it responds to the screen's characteristics.  In this section, we'll look at how you can embed responsive videos and images on AMP pages.

### Embedding videos

When you include a video in your web page, you want to ensure that the user can see the contents of the video and the video's controls (i.e., no overflowing).  Typically, you'll achieve this with a combination of CSS media queries, a container, and other CSS.  In AMP, you just need to add the video element to your page, and specify `layout=responsive` on the element—no extra CSS.

##### Example: Embedding a YouTube video

In the following example, we want to display an embedded YouTube video that responds to the size and orientation of the device's screen. By adding `"layout=responsive"` to the [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}) element, the video resizes to fit the widow, and its aspect ratio is maintained according to the specified `width` and `height`.

<div>
<amp-iframe height="174" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html"> <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div> <div placeholder></div> </amp-iframe></div>

There are many types of videos that you can add to your AMP pages.  For details,  see the list of available [media components]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}#media).

### Displaying responsive images

Images make up a large part of a web page (approximately [65% of the page's bytes](http://httparchive.org/interesting.php#bytesperpage)).  At minimum, your images should be visible on various screen sizes and orientations (i.e., the user doesn't have to scroll, pinch/zoom to see the entire image).  That's easily done in AMP via the  `"layout=responsive"` attribute (see [Include Images in AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/media_iframes_3p/index.md', locale=doc.locale).url.path}})).  In addition to the basic responsive image, you might want to serve multiple image resources to:

- [Serve crisp images for the right resolution](#serving-crisp-images-for-the-right-resolution)
- [Change the art direction of an image](#changing-the-art-direction-of-an-image)
- [Provide optimized image formats](#providing-optimized-images)

#### Serving crisp images for the right resolution

For high-resolution screens (e.g., Retina display), you should provide images that look crisp and sharp; however, you don't want to use that same image on low-res devices because that'll cause unnecessary extra load time.  In non-AMP and AMP pages,  you can serve the correct image for the screen's pixel density by using `srcset` with the width descriptor ( `w` ).

[tip type="note"]
**NOTE –**  The DPR (`x`) based srcset selector also works; however, for more flexibility, we recommend using the `w` selector. Previously (in the old srcset proposal), the `w` descriptor described the viewport width, but now it describes the width of the image source file, which allows the user agent to calculate the effective pixel density of each image and choose the appropriate image to render.
[/tip]

##### Example: Displaying a crisp image that fits the screen

In the following example we have several image files that are of the same aspect ratio but of different resolutions.  By supplying various image resolutions, the browser can choose the image that best suits the device's resolution.  Additionally, we've specified the size to render the image at :

- For a viewport width up to 400 px, render the image at 100% of the viewport width.
- For a viewport width up to 900 px, render the image at 75% of the viewport width.
- For everything above 900 px, render the image at 600 px wide.

<div>
<amp-iframe height=326 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.resolution.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Show full code</div><div placeholder></div></amp-iframe></div>

For example, say we have a device that has a viewport width of 412 px and a DPR of 2.6. Based on the code above, the image must be displayed at 75% of the viewport width, so the browser chooses an image close to 803 px  (412 * .75 * 2.6), which happens to be `apple-800.jpg`.

[tip type="read-on"]
**READ ON –** To learn more using srcset and sizes in AMP, see the [Art direction with srcset, sizes & heights]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md', locale=doc.locale).url.path}}) guide.
[/tip]

#### Changing the art direction of an image

Art direction refers to adapting an image's visual characteristics for certain breakpoints.  For example, instead of just scaling an image as the screen narrows, you might want to serve a cropped version of the image that narrows the focus of the image or you might want to serve completely different images at the different breakpoints.  In HTML, you can accomplish this by using the `picture` element.  In AMP, art direction can be achieved by using the `media` attribute.

##### Example: Different sized images for different breakpoints

In the following example, we have 3 different cropped images of a cat that we want to display at different breakpoints. So, if the viewport width is:

- 670 px or greater, display `cat-large.jpg` (650 x 340 px)
- 470 - 669 px,  display `cat-medium.jpg`  (450 x 340 px)
- 469 px or less, display `cat-small.jpg` (226 x 340 px)

[tip type="note"]
**NOTE –**  As we wanted the images to be fixed sizes (i.e., not skew), we didn't specify a layout value, which by default will be set to `layout=fixed` because we set the width and height. For more information, see ["What if the layout attribute isn’t specified?"]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md', locale=doc.locale).url.path}}#what-if-the-layout-attribute-isn’t-specified?).
[/tip]

<div><amp-iframe height=407 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.breakpoints.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Show full code</div><div placeholder></div></amp-iframe></div>

[tip type="read-on"]
**READ ON –** To learn more about art direction in AMP, see the [Art direction with srcset, sizes & heights]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md', locale=doc.locale).url.path}}) guide.
[/tip]

#### Providing optimized images

Delivering fast loading pages requires optimized images--in size, quality, and format.  Always reduce file sizes to the lowest acceptable quality level.  There are various tools that you can use to "crunch" images (e.g., [ImageAlph](http://pngmini.com/lossypng.html) or [TinyPNG](https://tinypng.com/)).  In terms of image formats,  some image formats provide better compression abilities that others (e.g., WebP and JPEG XR vs JPEG).  You'll want to provide the most optimized image for your user, as well as ensuring the image is supported by the user's browser (i.e., [not all browsers support all image formats](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)).

In HTML, you can serve different image formats by using the `picture` tag.  In AMP, although the `picture` tag isn't supported, you can serve different images by using the `fallback`  attribute.

[tip type="read-on"]
**READ ON –** To learn more about fallbacks, see the [Placeholders & Fallbacks]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}) guide.
[/tip]

##### Example: Serve different image formats

In the following example, if the browser supports WebP, serve mountains.webp, otherwise serve mountains.jpg.

<div>
<amp-iframe height=309 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.webp.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Show full code</div><div placeholder></div></amp-iframe></div>

As a nice bonus, some caches, like the Google AMP Cache, automatically compress and convert images to WebP and the right resolutions if you don't. However, not all platforms use caches, so you should still optimize images manually on your end.

[tip type="read-on"]
**READ ON –** To learn more about the image optimizations that the Google AMP Cache applies, see the ["Google AMP Cache, AMP Lite, and the need for speed"](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html) blog post.
[/tip]

## Examples to inspire you

Here are some examples that we hope inspire you to create responsive AMP pages:

#### Production

- [Getty Images "2016 in Focus" ](http://www.gettyimages.com/2016/)
- [BRIT + CO's holiday gift guide](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### Made by AMP

- [AMP by Example:  Samples & Templates](https://ampbyexample.com/#samples_templates)
- [AMP Start templates](https://www.ampstart.com/)
- [AMP Conf Workshop Codelab: Making beautiful AMPs](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
