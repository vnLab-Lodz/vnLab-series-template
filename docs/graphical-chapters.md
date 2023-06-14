# Graphical chapters 101

In order for a chapter to be rendered as a graphical one there is a need to specify the `slideshow` property in the mdx frontmatter as `true`. Both language versions need to be present and have this frontmatter property set (contents of those language versions does not need to be the same).

```mdx
---
slideshow: true
---
```

> All other frontmatter properties (excluding `headerImage`) for a normal chapter can still be applied

<br />

Graphical chapter can compose of the following slides:

| Slide&nbsp;Type  | Component              | Description                                                                                                                                                                                                                                                            | Accepts caption                                               |
| ---------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Title            | `TitleSlide`           | Slide that can accept simple markdown that will be centered. should only be used for the title slide with h1 and h3.                                                                                                                                                   | No                                                            |
| Text             | `TextSlide`            | Slide that can accept markdown text. All syntax from normal chapter is supported (note this does not apply to components). If the text overflows the slide will expand and allow for normal scrolling till the end of the slide instead of snapping to the next slide. | No                                                            |
| Center image     | `CenterImageSlide`     | Slide that accepts an image and renders it in the center of the slide.                                                                                                                                                                                                 | Yes                                                           |
| Fullscreen image | `FullscreenImageSlide` | Slide that accepts an image that will fill the slide container.                                                                                                                                                                                                        | Yes                                                           |
| Split slide      | `SplitSlide`           | Slide that accepts two other slides as children and allows to define either as sticky (if you want a long text slide and a sticky image for example). On mobile devices the slides render as separte ones one below the other.                                         | No                                                            |
| Viewport image   | `ViewportImageSlide`   | A slide wrapper that allows to the use of `ViewportImage` component from normal chapters.                                                                                                                                                                              | No (provide caption to the `ViewportImage` component instead) |
| Carousel         | `CarouselSlide`        | A slide wrapper that allows to the use of `Carousel` component from normal chapters.                                                                                                                                                                                   | No (provide captions to the `Carousel` component instead)     |

<br />

## Example of a graphical chapter composition

<details>
<summary>Expand example</summary>
<p>

```mdx
---
title: "Lorem Ipsum"
author: Dolor sit amet
index: 6.1
summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
slideshow: true
embeddedImagesLocal:
  - images/0_lorem.jpeg
  - images/1_lorem.jpeg
  - images/2_lorem.jpeg
  - images/3_lorem.jpeg
  - images/4_lorem.jpeg
  - images/5_lorem.jpeg
  - images/6_lorem.jpeg
  - images/7_lorem.jpeg
---

// This will render a slide with centered text. Most of the time should just use the h1 and h2.
// Note the empty lines.

<TitleSlide>

# Lorem Ipsum

### Dolor sit amet

</TitleSlide>

// This will render a text slide

<TextSlide>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
  in culpa qui officia deserunt mollit anim id est laborum.
</TextSlide>

// This will render a fullscreen image

<FullscreenImageSlide
  image={props.localImages[0]}
  caption="Nunc pretium eleifend libero."
/>

// This will render two text slides next to each other

<SplitSlide rightSticky>
  <TextSlide>

> Curabitur sit amet sagittis nisi. Mauris mi magna, mollis et tellus id, efficitur consequat libero. Curabitur tellus odio, convallis at maximus ut, commodo lacinia arcu. Aliquam turpis mi, blandit rhoncus purus sed, scelerisque pellentesque odio. Suspendisse dignissim mi nec risus porttitor, non dapibus sapien finibus.

  </TextSlide>
  <CenterImageSlide
    image={props.localImages[1]}
    caption="Curabitur dui sapien, pretium id nisl a, faucibus fringilla augue."
  />
</SplitSlide>

// This will render a center image slide

<CenterImageSlide
  image={props.localImages[5]}
  caption="Slides from the archive of Ryszard Kisiel"
/>

// This will render a carousel like in text chapters

<CarouselSlide>
  <Carousel
    images={[
      props.localImages[2],
      props.localImages[3],
      props.localImages[4],
      props.localImages[5],
      props.localImages[6],
    ]}
    captions={[
      "Cras sed mauris eget sapien commodo bibendum quis non dui.",
      "Cras sed mauris eget sapien commodo bibendum quis non dui.",
      "Cras sed mauris eget sapien commodo bibendum quis non dui.",
      "Cras sed mauris eget sapien commodo bibendum quis non dui.",
      "Cras sed mauris eget sapien commodo bibendum quis non dui.",
    ]}
  />
</CarouselSlide>

// This will render a viewport image line in text chapters

<ViewportImageSlide>
  <ViewportImage
    image={props.localImages[7]}
    caption="Donec id maximus enim."
  />
</ViewportImageSlide>
```

</p>
</details>

## Slide components

<br />

### 1. Title

This slide component can accept basic form of markdown. It can be used to create a title slide for the chapter. Contents of input markdown will be centered on the slide. Title slide also includes a downward-pointing arrow belowe the rendered text.

```mdx
<TitleSlide>

# Title

### Subtitle/Author

</TitleSlide>
```

<br />

### 2. Text

This slide component can accept markdown like in text chapters. If the text overflows the slide will expand and allow for normal scrolling till the end of the slide instead of snapping to the next slide.

```mdx
<TextSlide>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
  in culpa qui officia deserunt mollit anim id est laborum.
</TextSlide>
```

<br />

### 3. Center image

This slide component accepts an `image` and `caption` properties similar to all other image components in the template.

```jsx
<CenterImageSlide
  image={props.localImages[5]}
  caption="Slides from the archive of Ryszard Kisiel"
/>
```

<br />

### 4. Fullscreen image

This slide component accepts an `image` and `caption` properties similar to all other image components in the template.

```jsx
<FullscreenImageSlide
  image={props.localImages[0]}
  caption="Nunc pretium eleifend libero."
/>
```

<br />

### 5. Split slide

Slide that accepts two other slides as children and allows to define either as sticky (if you want a long text slide and a sticky image for example). On mobile devices the slides render as separte ones one below the other.

You should use `TextSlide`, `CenterImageSlide` or `FullscreenImageSlide` as children.

```jsx
<SplitSlide>
  <CenterImageSlide
    image={props.localImages[0]}
    caption="Curabitur dui sapien, pretium id nisl a, faucibus fringilla augue."
  />
  <CenterImageSlide
    image={props.localImages[1]}
    caption="Curabitur dui sapien, pretium id nisl a, faucibus fringilla augue."
  />
</SplitSlide>
```

You can define the sticky slide by providing `rightSticky` or `leftSticky` as props to the `SplitSlide` component.

```jsx
<SplitSlide rightSticky>
  <TextSlide>
    > Curabitur sit amet sagittis nisi. Mauris mi magna, mollis et tellus id,
    efficitur consequat libero. Curabitur tellus odio, convallis at maximus ut,
    commodo lacinia arcu. Aliquam turpis mi, blandit rhoncus purus sed,
    scelerisque pellentesque odio. Suspendisse dignissim mi nec risus porttitor,
    non dapibus sapien finibus.
  </TextSlide>
  <CenterImageSlide
    image={props.localImages[1]}
    caption="Curabitur dui sapien, pretium id nisl a, faucibus fringilla augue."
  />
</SplitSlide>
```

## Viewport image

A slide wrapper that allows to the use of `ViewportImage` component from normal text chapters.

```jsx
<ViewportImageSlide>
  <ViewportImage
    image={props.localImages[7]}
    caption="Donec id maximus enim."
  />
</ViewportImageSlide>
```

## Carousel

A slide wrapper that allows to the use of `Carousel` component from normal chapters.

```jsx
<CarouselSlide>
  <Carousel
    images={[
      props.localImages[2],
      props.localImages[3],
      props.localImages[4],
      props.localImages[5],
      props.localImages[6],
    ]}
    captions={[
      "Cras sed mauris eget sapien commodo bibendum quis non dui.",
      "Cras sed mauris eget sapien commodo bibendum quis non dui.",
      "Cras sed mauris eget sapien commodo bibendum quis non dui.",
      "Cras sed mauris eget sapien commodo bibendum quis non dui.",
      "Cras sed mauris eget sapien commodo bibendum quis non dui.",
    ]}
  />
</CarouselSlide>
```
