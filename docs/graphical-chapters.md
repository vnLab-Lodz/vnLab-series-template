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

| Slide&nbsp;Type  | Component              | Description                                                                                                          | Accepts caption |
| ---------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------- |
| Title            | `TitleSlide`           | Slide that can accept simple markdown that will be centered. should only be used for the title slide with h1 and h3. | No              |
| Text             | `TextSlide`            | Slide that can accept simple markdown text. If the text overflows the slide will become scrollable.                  | No              |
| Center image     | `CenterImageSlide`     | Slide that accepts an image and renders it in the center of the slide.                                               | Yes             |
| Fullscreen image | `FullscreenImageSlide` | Slide that accepts an image that will fill the slide container.                                                      | Yes             |
| Two images       | `TwoImageSlide`        | Slide that accepts two images and a direction to display them in.                                                    | Yes             |
| Vertical         | `VerticalSlides`       | Basic slide wrapper that can be used to compose a vertical slide layout                                              | No              |

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

// This will render a slide with centered text. Most of the time should just use the
// Note the empty lines.

<TitleSlide>

# Kisieland

### Karol Radziszewski

</TitleSlide>

// This will render a fullscreen image

<FullscreenImageSlide image={props.localImages[0]} />

// This will render two text slides in the vertical layout

<VerticalSlides>
<TextSlide>
  One day Ryszard pulled out a plastic bag full of carefully annotated boxes
  containing almost 300 colour slides. As it turned out, these were documented
  photographic sessions arranged by Kisiel and his friends in one of their
  private apartments. The slides were made at the end of 1985 and the beginning
  of 1986 as a direct reaction to the “Hyacinth” action (a large-scale operation
  of Citizens’ Militia whose objective was to collect information about Polish
  gays and their environment, and which resulted in the registering of around
  11000 personal files). As Kisiel admits: “Once they started to uncover us,
  there was no point in staying hidden any more. We had nothing to lose, so we
  decided to do our own thing and not be bothered by anything.”
</TextSlide>

<TextSlide>

In 2008, I began work on a special issue of my self-published periodical, _DIK
Fagazine_. It was entirely devoted to the life of homosexuals in Central and
Eastern Europe before 1989. While I was digging into the subject and searching
for resources, I met many different people whom I then interviewed. This is
how I came across Ryszard Kisiel, among others.

<br />

At first I only knew that in the 1980’s he had been publishing _Filo_, the
first – half-legally distributed among friends – gay zine in this part of
Europe. During subsequent meetings that took place at Kisiel’s home in **Gdańsk**,
I had a chance to get acquainted with his extensive archive, which allowed me
to discover new facts about the gay community of the period and learn about
various aspects of his activities.

</TextSlide>
</VerticalSlides>

<VerticalSlides>
  <FullscreenImageSlide image={props.localImages[1]} />
  <FullscreenImageSlide image={props.localImages[2]} />
  <FullscreenImageSlide image={props.localImages[3]} />
</VerticalSlides>

// This will render a center image slide with a simple non-expandable caption

<CenterImageSlide
  image={props.localImages[5]}
  caption="Slides from the archive of Ryszard Kisiel"
/>

// This will render center image slides in vertical layout and some will have an expandable caption
// The `caption` and `extended` caption can also accept simple markdown

<VerticalSlides>
  <CenterImageSlide
    image={props.localImages[6]}
    caption="Slides from the archive of Ryszard Kisiel"
    extendedCaption="Woah this is a caption"
  />
  <CenterImageSlide
    image={props.localImages[1]}
    caption="możliwy opis zdjęcia zawierające takie informacje jak tytuł, nazwisko autora itp."
    extendedCaption="Woah this is a caption"
  />
  <CenterImageSlide image={props.localImages[7]} />
  <CenterImageSlide image={props.localImages[8]} />
  <CenterImageSlide image={props.localImages[9]} />
  <CenterImageSlide image={props.localImages[10]} />
</VerticalSlides>

// This will render a two image slide with expandable caption

<TwoImageSlide
  direction="column"
  image1={props.localImages[12]}
  image2={props.localImages[13]}
  caption="możliwy opis zdjęcia zawierające takie informacje jak tytuł, nazwisko autora itp."
  extendedCaption="Woah this is a caption"
/>
<TwoImageSlide
  image1={props.localImages[12]}
  image2={props.localImages[13]}
  caption="możliwy opis zdjęcia zawierające takie informacje jak tytuł, nazwisko autora itp."
  extendedCaption="Woah this is a caption"
/>
```

## Slide components

<br />

### 0. Slide

This slide component can accept children slides. A `background` property can be specified to change the background color of the slide. This component is a base for other ones and provides them with the functionality of adding a background. **This component should not be used for anything.**

```jsx
<Slide background="#4f4f4f">// Not used for anything</Slide>
```

<br />

### 1. Title

This slide component can accept basic form of markdown. It can be used to create a title slide for the chapter. Contents of input markdown will be centered on the slide. Just like the normal `Slide` component it can also accept the `background` property.

```mdx
<Title background="#4f4f4f">

# Title

### Subtitle/Author

</Title>
```

<br />

### 2. Text

This slide component can accept basic form of markdown. If the text overflows it will become scrollable. Just like the normal `Slide` component it can also accept the `background` property.

```mdx
<TextSlide>
  One day Ryszard pulled out a plastic bag full of carefully annotated boxes
  containing almost 300 colour slides. As it turned out, these were documented
  photographic sessions arranged by Kisiel and his friends in one of their
  private apartments. The slides were made at the end of 1985 and the beginning
  of 1986 as a direct reaction to the “Hyacinth” action (a large-scale operation
  of Citizens’ Militia whose objective was to collect information about Polish
  gays and their environment, and which resulted in the registering of around
  11000 personal files). As Kisiel admits: “Once they started to uncover us,
  there was no point in staying hidden any more. We had nothing to lose, so we
  decided to do our own thing and not be bothered by anything.”
</TextSlide>
```

<br />

### 3. Center image

This slide component accepts an `image` property similar to all other image components in the template. Just like the normal `Slide` component it can also accept the `background` property.

```jsx
<CenterImageSlide image={props.localImages[0]} />
```

<br />

### 4. Fullscreen image

This slide component accepts an `image` property similar to all other image components in the template. Just like the normal `Slide` component it can also accept the `background` property.

```jsx
<FullscreenImageSlide image={props.localImages[5]} />
```

<br />

### 5. Two images

This slide component accepts `image1`, `image2` and `direction` properties. The direction property can be set to `column` or `row` and it determines the layout of the slide. The `direction` prop is optional and does not need to be specified. The default value for the `direction` prop is `row`. Just like the normal `Slide` component it can also accept the `background` property.

```jsx
<TwoImageSlide
  image1={props.localImages[0]}
  image2={props.localImages[1]}
  direction="column"
/>
```

## Vertical slides

You can create a vertical slide that can be navigated up and down by wrapping desired slides in the `VerticalSlides` component, like in the example below.

```mdx
<VerticalSlides>
  <CenterImageSlide
    image={props.localImages[6]}
    caption="Slides from the archive of Ryszard Kisiel"
    extendedCaption="Woah this is a caption"
  />
  <CenterImageSlide
    image={props.localImages[1]}
    caption="możliwy opis zdjęcia zawierające takie informacje jak tytuł, nazwisko autora itp."
    extendedCaption="Woah this is a caption"
  />
  <CenterImageSlide image={props.localImages[7]} />
  <CenterImageSlide image={props.localImages[8]} />
  <CenterImageSlide image={props.localImages[9]} />
  <CenterImageSlide image={props.localImages[10]} />
</VerticalSlides>
```

## Caption slides

All the slides that support captions accept `caption` and `extendedCaption` properties. You can provide only `caption` or both.

```mdx
// Provide only the basic caption

<CenterImageSlide
  image={props.localImages[5]}
  caption="Slides from the archive of Ryszard Kisiel"
/>

// Provide basic and extended captions.

<TwoImageSlide
  image1={props.localImages[11]}
  image2={props.localImages[18]}
  caption="możliwy opis zdjęcia zawierające takie informacje jak tytuł, nazwisko autora itp."
  extendedCaption="Woah this is a caption"
/>
```
