---
$title: Introduction to complex animations
$order: 2
$categories: "multimedia-animations"
description: For animations that can't be driven by adding and removing classes, AMP offers several animation specific components. These components apply AMP's principles to animations ...
formats:
  - websites
  - ads
author: CrystalOnScript
---

For animations that can't be driven by [adding and removing classes]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/animations/triggering_css_animations.md', locale=doc.locale).url.path}}), AMP offers several animation specific components. These components apply AMP's principles to animations: they're fast, efficient, and user first. AMP restricts what CSS properties inside keyframes are allowed, but grants benefits such as fine-grain control, seamless animations, and cross browser compatibility with no extra work.

## Creating a basic AMP Animation

The [`amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}) component enables use of the [Web Animation API](https://www.w3.org/TR/web-animations/) in AMP.

A basic [`amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}) is a JSON object made of the following key parts:

*   The element the component is animating, or `selector`.
*   [Timing Properties]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#timing-properties)
*   [Keyframes]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#keyframes)
*   [Trigger]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### Selector

Much like CSS, the [`amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}) component links the animation properties to the element by declaring the element's tag name, class, or id in the `"selector"` field. The component animates each element with the tag type or class name declared. Use an id to ensure you animate a single element.

### Timing Properties

The [timing properties]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#timing-properties) control how long an animation takes, the amount of times it plays, and which direction keyframes execute.

While none of the timing properties are required, an animation might not run correctly if properties related to time and display are missing, such as `duration` and `fill`.

### Keyframes

While CSS allows you to morph from one state to another via transitions, you must declare animation properties as keyframes to implement [`amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}) (similar to [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)). To ensure smooth playback and cross browser compatibility, [`amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}})[restricts what keyframe properties]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#white-listed-properties-for-keyframes) are usable to GPU accelerated properties that do not cause a re-layout and can animate on the [compositor thread](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). This prevents animations from interfering with AMP and the browser's [render process](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing).

[tip type="note"]
 Keyframes are either defined directly in an [`amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}) or referenced from [`<amp style-keyframe>`]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/index.md', locale=doc.locale).url.path}}#keyframes-stylesheet) as long as they follow the property restrictions. Read more [here about keyframes in `amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#keyframes).
[/tip]

### Trigger

The trigger starts the animation sequence. The [`amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}) extension starts either when the `<body>` becomes visible on the page or by connecting it to an [AMP action or event](https://www.ampproject.org/docs/interaction_dynamic/amp-actions-and-events).

Triggering on visibility of `<body>` is useful when the animation should run as soon as the page loads because it appears "above the fold", or within the first viewport of the page. Animations trigger through visibility by adding `trigger="visibility"` as an attribute to the component.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

Animations connect to an action or event by assigning the [`amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}) component an `id` and linking that `id` to the desired event trigger, such as tapping a button.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Building Complex Animations

Building an animation in [`amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}) allows for fine grained control that goes beyond starting and stopping an animation: it can also pause, reverse, and directed to a specific point. You can even chain multiple animations together and animate elements in a sequence.

### Subtargets

Elements of the same tag or class can have specified timing properties and override the values of variables defined in the top level animation.

```
{
  "selector": ".target",
  "delay": 100,
  "--y": "100px",
  "subtargets": [
    {
      "index": 0,
      "delay": 200,
    },
    {
      "selector": ":nth-child(2n+1)",
      "--y": "200px"
    }
  ]
}
```

### Chained Animations

Multiple animations can connect together to form a large sequence. You can create timed effects, such as overlays on a video, by writing animations in the `animations` array within the [`amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}) component.

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>

```

This setup plays each animation for 3 seconds in a sequence.

For larger animations, animations inside the `animations` array are able to reference other [`amp-animation`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}) components.

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### Animating an unknown amount of elements

By using [`var()` and `calc()` expressions]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}) along with [CSS extensions]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#css-extensions), you can write complex and timed animationsthat work with any number of elements. This allows for dynamic and user generated data to be animated with ease and fluidity.

```
<amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
    {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index()) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
            {"transform": "translate3d(0px, 0px, 0px)"},
            {"transform": "translate3d(50%, 0px, 100px)"},
            {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
            {"transform": "translate3d(50%, 0px, -100px)"},
            {"transform": "translate3d(0px, 0px, -1px)"}
        ]
    }
    </script>
</amp-animation>
```

This example works by:

*   Declaring a variable, `--duration`, and gives it the value of two seconds.
*   Sets the `duration` to the var `--duration`'s value.
*   Calculates the delay applied to each element with that meets the selector `.card`.
    1.  The [length()` extension]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#css-length()-extension) calculates how many `.card` elements were selected
    1.  The length then subtracts each `.card`'s [index()]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#css-index()-extension)
    1.  The resulting value is multiplied by the var `--duration`
    1.  The final total is applied in seconds to that element's delay
*   The animation is applied to each element individually so that the cards are shuffled one after another instead of all at the same time.

### Look Great, Everywhere

Animations can include [`conditions`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#conditions) that allow customized effects. Tailor animations to any screen size through the [`media` condition]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#media-query) and supports backwards browser compatibility by enabling [`supports` conditions]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#supports-condition) in a [`switch` statement]({{g.doc('/content/amp-dev/documentation/components/reference/amp-animation.md', locale=doc.locale).url.path}}#animation-switch-statement).

```
{
  "selector": "#target1",
  "duration": "1s",
  "switch": [
    {
      "supports": "offset-distance: 0",
      "keyframes": {
        "offsetDistance": [0, '300px']
      }
    },
    {
      "keyframes": {
        "transform": [0, '300px']
      }
    }
  ]
}
```
