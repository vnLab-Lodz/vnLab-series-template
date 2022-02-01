# Graphical chapters 101

In order for a chapter to be rendered as a graphical one there is a need to specify the `slideshow` property in the mdx frontmatter as `true`. Both language versions need to be present and have this frontmatter property set (contents of those language versions does not need to be the same).

```mdx
---
slideshow: true
---
```

> All other frontmatter properties for a normal chapter can still be applied

<br />

Graphical chapter can compose of the following slides:

| Slide&nbsp;Type  | Component              | Description                                                                                                                            |
| ---------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Slide            | `Slide`                | Basic slide wrapper that can be used to compose a vertical slide layout                                                                |
| Text             | `TextSlide`            | Slide that can accept simple markdown text that will be centered on the slide                                                          |
| Center image     | `CenterImageSlide`     | Slide that accepts an image and renders it in the center of the slide.                                                                 |
| Annotated image  | `AnnotatedImageSlide`  | Slide that accepts an image and annotation to be displayed under it. The image will shrink down to accommodate the height of the text. |
| Fullscreen image | `FullscreenImageSlide` | Slide that accepts an image that will fill the slide container.                                                                        |
| Two iamges       | `TwoImageSlide`        | Slide that accepts two images and a direction to display them in.                                                                      |

<br />

## Example of a graphical chapter composition

<br />

```mdx
---
title: "Kisieland"
author: Karol Radziszewski
index: 6.1
date: "2021-07-29"
summary: This is an example summary
slideshow: true
embeddedImagesLocal:
  - images/0_z_archiwum_Kisiela_1.jpeg
  - images/1_z_archiwum_Kisiela_2.jpeg
  - images/2_z_archiwum_Kisiela_3.jpeg
  - images/3_z_archiwum_Kisiela_4.jpeg
  - images/4_z_archiwum_Kisiela_5.jpeg
  - images/5_z_archiwum_Kisiela_6.jpeg
  - images/6_z_archiwum_Kisiela_7.jpeg
  - images/7_z_archiwum_Kisiela_8.jpeg
---

// This will render a normal text slide

<TextSlide>

# Kisieland

## Karol Radziszewski

</TextSlide>

// This will render a slide with vertical two image slides nested inside

<Slide>
  <TwoImageSlide
    image1={props.localImages[0]}
    image2={props.localImages[1]}
    direction="column"
  />
  <TwoImageSlide
    direction="row"
    image1={props.localImages[2]}
    image2={props.localImages[3]}
  />
</Slide>

// This will render a normal slide with an annotated image

<AnnotatedImageSlide image={props.localImages[4]}>
  **The totality/fragmentariness of the archive.** Considering the fact that the
  universalist ambitions of the archive have already been subject to repeated
  criticism — in the guise of collecting a totality of knowledge and
  constructing an all-encompassing narrative, both intimately tied to issues of
  power and empire — this problem seems to belong to the past.
</AnnotatedImageSlide>

// This will render a slide with vertical fullscreen slides nested inside

<Slide>
  <FullscreenImageSlide image={props.localImages[5]} />
  <FullscreenImageSlide image={props.localImages[6]} />
  <FullscreenImageSlide image={props.localImages[7]} />
</Slide>

// This will render a slide with vertical center image slides nested inside

<Slide>
  <CenterImageSlide image={props.localImages[0]} />
  <CenterImageSlide image={props.localImages[1]} />
  <CenterImageSlide image={props.localImages[2]} />
</Slide>
```

## Slide components

<br />

### 1. Slide

---

This slide component can accept children slides. A `background` property can be specified to change the background color of the slide.

```jsx
  <Slide background="#4f4f4f">
    // Other slides that are meant to be traversed vertically
  </Slide>

 <Slide>
  // Other slides that are meant to be traversed vertically
 <Slide>

```

<br />

## 2. Text

---

This slide component can accept basic form of markdown. It can be used to create a title slide for the chapter. Contents of input markdown will be centered on the slide. Just like the normal `Slide` component it can also accept the `background` property.

```mdx
// It is important to have a blank line after opening the component brackets

<TextSlide>

# Tytuł

## Autor

</TextSlide>
```

<br />

## 3. Center image

---

This slide component accepts an `image` property similar to all other image components in the template. Just like the normal `Slide` component it can also accept the `background` property.

```jsx
<CenterImageSlide image={props.localImages[0]} />
```

<br />

## 4. Annotated image

---

This slide component accepts an `image` prop and markdown as it's children. Just like the normal `Slide` component it can also accept the `background` property.

```jsx
<AnnotatedImageSlide image={props.localImages[4]}>
  Markdown content of the annotation that can use all the basic markdown
  formatting.
</AnnotatedImageSlide>
```

<br />

## 5. Fullscreen image

---

This slide component accepts an `image` property similar to all other image components in the template. Just like the normal `Slide` component it can also accept the `background` property.

```jsx
<FullscreenImageSlide image={props.localImages[5]} />
```

<br />

## 6. Two images

---

This slide component accepts `image1`, `image2` and `direction` properties. The direction property can be set to `column` or `row` and it determines the layout of the slide. The `direction` prop is optional and does not need to be specified. The default value for the `direction` prop is `row`. Just like the normal `Slide` component it can also accept the `background` property.

```jsx
<TwoImageSlide
  image1={props.localImages[0]}
  image2={props.localImages[1]}
  direction="column"
/>
```

## Vertical slides

You can create a vertical slide that can be navigated up and down by wrapping desired slides in the basic `Slide` component, like in the example above.
