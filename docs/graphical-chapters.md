# Graphical chapters 101

## Slideshow chapters

In order for a chapter to be rendered as a slideshow there is a need to specify the `slideshow` property in the mdx frontmatter as `true`. Both language versions need to be present and have this frontmatter property set (contents of those language versions does not need to be the same).

```mdx
---
slideshow: true
---
```

> All other frontmatter properties (excluding `headerImage`) for a normal chapter can still be applied

## Flowing graphical chapters

In order for a chapter to be rendered as a graphical one there is a need to specify the `graphical` property in the mdx frontmatter as `true`. Both language versions need to be present and have this frontmatter property set (contents of those language versions does not need to be the same).

```mdx
---
graphical: true
---
```

> All other frontmatter properties (excluding `headerImage`) for a normal chapter can still be applied

<br />

Slideshow chapter can compose of the following slides:

| Slide&nbsp;Type  | Component              | Description                                                                                                                                                                                                                                                            | Accepts caption                                               |
| ---------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Title            | `TitleSlide`           | Slide that can accept simple markdown that will be centered. should only be used for the title slide with h1 and h3.                                                                                                                                                   | No                                                            |
| Text             | `TextSlide`            | Slide that can accept markdown text. All syntax from normal chapter is supported (note this does not apply to components). If the text overflows the slide will expand and allow for normal scrolling till the end of the slide instead of snapping to the next slide. | No                                                            |
| Center image     | `CenterImageSlide`     | Slide that accepts an image and renders it in the center of the slide.                                                                                                                                                                                                 | Yes                                                           |
| Fullscreen image | `FullscreenImageSlide` | Slide that accepts an image that will fill the slide container.                                                                                                                                                                                                        | Yes                                                           |
| Split slide      | `SplitSlide`           | Slide that accepts two other slides as children and allows to define either as sticky (if you want a long text slide and a sticky image for example). On mobile devices the slides render as separte ones one below the other.                                         | No                                                            |
| Viewport image   | `ViewportImageSlide`   | A slide wrapper that allows to the use of `ViewportImage` component from normal chapters.                                                                                                                                                                              | No (provide caption to the `ViewportImage` component instead) |
| Carousel         | `CarouselSlide`        | A slide wrapper that allows to the use of `Carousel` component from normal chapters.                                                                                                                                                                                   | No (provide captions to the `Carousel` component instead)     |

In addition to all the components above graphical chapters can be composed of:

| Component&nbsp;Type    | Component              | Description                    | Accepts caption |
| ---------------------- | ---------------------- | ------------------------------ | --------------- |
| Grid                   | `Grid`                 | Top level grid wrapper         | No              |
| Grid row               | `GridRow`              | Grid row wrapper               | No              |
| Grid column            | `GridColumn`           | Grid column wrapper            | No              |
| Fullscreen grid column | `FullscreenGridColumn` | Fullscreen grid column wrapper | No              |
| Grid image             | `GridImage`            | Grid image component           | Yes             |
| Full width grid column | `FullWidthGridColumn`  | Full width grid column wrapper | No              |

<br />

## Example of a slideshow chapter composition

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

## Example of a graphical chapter composition

<details>
<summary>Expand example</summary>
<p>

```mdx
---
title: "Wojciech Wilczyk: Photographs"
author: Wojciech Wilczyk
index: 1.02
date: "2021-07-29"
summary: "A presentation of photographs by Wojciech Wilczyk, from series *Silesia in Black and White*, *There is No Such Thing* as an *Innocent Eye and Other City*."
graphical: true
embeddedImagesLocal:
  - images/0_wilczyk_01.webp
  - images/1_wilczyk_02.webp
  - images/2_wilczyk_03.webp
  - images/3_wilczyk_04.webp
  - images/4_wilczyk_05.webp
  - images/5_wilczyk_06.webp
  - images/6_wilczyk_07.webp
  - images/7_wilczyk_08.webp
  - images/8_wilczyk_09.webp
  - images/9_wilczyk_10.webp
  - images/10_wilczyk_11.webp
  - images/11_wilczyk_12.webp
  - images/12_wilczyk_13.webp
  - images/13_wilczyk_14.webp
  - images/14_wilczyk_15.webp
  - images/15_wilczyk_16.webp
  - images/16_wilczyk_17.webp
  - images/17_wilczyk_18.webp
  - images/18_wilczyk_19.webp
  - ../chapter_3/images/1_gunthert.webp
embeddedAudioLocal:
  - {
      src: "../chapter_0/sample-3s.mp3",
      title: "Dłuższy lub krótszy tytuł",
      author: "Osoba autorska",
    }
---

<CenterImageSlide arrow image={props.localImages[0]} />

<TitleSlide >

# Wojciech Wilczyk: Photographs

</TitleSlide>

<Grid>
  <GridRow>
    <FullscreenGridColumn>
      <FullscreenImageSlide
        image={props.localImages[4]}
        caption="Elżbieta Janicka & Wojciech Wilczyk, *New Town*, Śliska St., 15.04.11."
      />
    </FullscreenGridColumn>
  </GridRow>
  <GridRow>
    <GridColumn>
      <GridImage
        image={props.localImages[6]}
        caption="Wojciech Wilczyk, *Silesia in Black and White*, Bytom-Bobrek, Pasteur St. (Bobrek Steel Mill), March 15, 2003."
      />
    </GridColumn>
    <GridColumn>
      <GridImage
        image={props.localImages[8]}
        caption="Wojciech Wilczyk, *Silesia in Black and White*, Zabrze – Biskupice,Ogrodowa St., February 1, 2001."
      />
    </GridColumn>
    <GridColumn>
      <GridImage
        image={props.localImages[19]}
        caption="Wojciech Wilczyk, *Silesia in Black and White*, Bytom - Bobrek, carbide factory, December 8, 2002."
      />
    </GridColumn>
  </GridRow>
  <GridRow>
    <FullWidthGridColumn>
      <GridImage
        image={props.localImages[19]}
        caption="Wojciech Wilczyk, *Silesia in Black and White*,  Swietochłowice – hard coal mine Polska, March 25, 2001."
      />
    </FullWidthGridColumn>
  </GridRow>
  <GridRow>
    <GridColumn>
      <GridImage
        image={props.localImages[7]}
        caption="Wojciech Wilczyk, *Silesia in Black and White*,  Swietochłowice – hard coal mine Polska, March 25, 2001."
      />
    </GridColumn>
  </GridRow>
</Grid>

<FullscreenImageSlide
  image={props.localImages[4]}
  caption="Elżbieta Janicka & Wojciech Wilczyk, *New Town*, Śliska St., 15.04.11."
/>

<SplitSlide>
  <CenterImageSlide
    image={props.localImages[6]}
    caption="Wojciech Wilczyk, *Silesia in Black and White*, Bytom-Bobrek, Pasteur St. (Bobrek Steel Mill), March 15, 2003."
  />
  <CenterImageSlide
    image={props.localImages[8]}
    caption="Wojciech Wilczyk, *Silesia in Black and White*, Zabrze – Biskupice,Ogrodowa St., February 1, 2001."
  />
</SplitSlide>

<TextSlide>

> The decision to work on black-and-white material, which appeared to me as plain, logical and unquestionable, led, as I said, to the specific limitation of the subject. Colour technique seems to be, or simply is, way more transparent. The monochrome forces the choice of slightly different motives, that can be somehow aestheticised through the use of chiaroscuro, contrast manipulation and the scale of halftones. Postindustrial, concrete ruins are just perfect for monumentalisation, which enables us to see them as “postindustrial sculptures” and overshadows the social issues, which were pretty dramatic in Upper Silesia at the time.

<AudioPlayer track={props.localAudio[0]} />

</TextSlide>

<CenterImageSlide
  image={props.localImages[5]}
  caption="Wojciech Wilczyk, *Silesia in Black and White*, Bytom - Bobrek, carbide factory, December 8, 2002."
/>

<SplitSlide>
  <TextSlide>

> I think that these ruined plants, closed factories left to be devastated, constitute the modern motif of vanitas – vividly present in the European fine arts – expressing instability, death and passing. It is good that the photos you mentioned are visually attractive. They need to be: the spectator should want to see them. All strategies that help attract the public are absolutely recommended.

  </TextSlide>

<CenterImageSlide
    image={props.localImages[7]}
    caption="Wojciech Wilczyk, *Silesia in Black and White*,  Swietochłowice – hard coal mine Polska, March 25, 2001."
  />
</SplitSlide>

<FullscreenImageSlide
  image={props.localImages[11]}
  caption="Wojciech Wilczyk, *There is No Such Thing as an Innocent Eye*, Maków Mazowiecki, beit midrash, April 29, 2007."
/>

<TextSlide>

> To be quite frank, at the beginning I made the decision to work in the monochromatic technique. I thought that the use of black-and-white material would enable me to underline the character of these buildings, their architectural shape, and allow me to suppress every contemporary element. I quickly realized how flawed this strategy was. While processing the negatives, I confronted the scanned images with what I had in my memory and understood that all these imports, elements of disorder, mess, decay, “stylistic interventions” – all the contemporary context – were of great importance here. I decided to show these buildings in their surroundings instead of avoiding them.

</TextSlide>

<SplitSlide>
  <CenterImageSlide
    image={props.localImages[12]}
    caption="Wojciech Wilczyk, *There is No Such Thing as an Innocent Eye*, Nowy Korczyn, synagogue, March 07, 2008."
  />
  <TextSlide>

> I would like to emphasize the fact that I have never been keen to create projects “to be watched with pleasure after years”.

  </TextSlide>
</SplitSlide>

<CarouselSlide>
  <Carousel
    images={[
      props.localImages[9],
      props.localImages[10],
      props.localImages[11],
      props.localImages[14],
      props.localImages[15],
    ]}
    captions={[
      "Wojciech Wilczyk, *There is No Such Thing as an Innocent Eye*, Kargowa, synagogue, August 29, 2008.",
      "Wojciech Wilczyk, *There is No Such Thing as an Innocent Eye*, Kraków, Bejt ha-midrasz Halberstama, August 25, 2009.",
      "Wojciech Wilczyk, *There is No Such Thing as an Innocent Eye*, Maków Mazowiecki, beit midrash, April, 29, 2007.",
      "Wojciech Wilczyk, *There is No Such Thing as an Innocent Eye*, Ujazd, synagogue, March 06, 2007.",
      "Wojciech Wilczyk, *There is No Such Thing as an Innocent Eye*, Wielkie Oczy, synagogue, July 28, 2007.",
    ]}
  />
</CarouselSlide>

<TextSlide>

> At first I also planned a more rigorous mode of presentation. I considered, for example, a classical typology, displaying only facades, photographed en face and of similar proportions. The more flexible attitude was forced by the very character of the subject, the variety of the buildings’ forms and locations. An attempt at a visual typology, featuring, for example, certain common characteristics of the chosen motif, would be the wrong attitude or even an unfeasible task.

</TextSlide>

<SplitSlide>
  <CenterImageSlide
    image={props.localImages[13]}
    caption="Wojciech Wilczyk, *There is No Such Thing as an Innocent Eye*, Radymno, synagogue, June 07, 2007."
  />
  <CenterImageSlide
    image={props.localImages[16]}
    caption="Wojciech Wilczyk, *There is No Such Thing as an Innocent Eye*, Wolsztyn, synagogue, February 03, 2008."
  />
</SplitSlide>

<SplitSlide>
  <CenterImageSlide
    image={props.localImages[17]}
    caption="Wojciech Wilczyk, *There is No Such Thing as an Innocent Eye*, Łask, synagogue, November 25, 2008."
  />
  <CenterImageSlide
    image={props.localImages[18]}
    caption="Wojciech Wilczyk, *There is No Such Thing as an Innocent Eye*, Łaszczów, beit midrash, January 09, 2008."
  />
</SplitSlide>

<TextSlide>

> Working on the _Other City_, we are making an attempt to photograph, not only the area of a former ghetto and the earlier Jewish quarter, but also traffic routes (or the traces of the ones long gone), and places important for the tragic history of the district, such as the locations of gates and walls, or the culverts connecting the small and big ghetto (such as the footbridge on Chłodna Street).

</TextSlide>

<FullscreenImageSlide
  image={props.localImages[1]}
  caption="Elżbieta Janicka & Wojciech Wilczyk, *New Town*, Prosta and Żelazna St., April 08, 2011."
/>

<TextSlide>

> We have decided to vivisect a modern city with a tragic history. The focus of our interest is the city centre, that is, the part that used to be an informal Jewish quarter before World War II. During the occupation a vast part of this area was turned into a ghetto (in the centre of a city with 1,000,000 inhabitants) that was subsequently liquidated, with the deportation of the inhabitants to death camps. After the Ghetto Uprising, which started April 19, 1943, the area was deliberately destroyed – during the fights, and later, the buildings were burnt and blown up.

</TextSlide>

<CarouselSlide>
  <Carousel
    images={[props.localImages[0], props.localImages[3], props.localImages[4]]}
    captions={[
      "Elżbieta Janicka & Wojciech Wilczyk, *New Town*, Grzybowski Square (Nożyk Synagogue), April 07, 2011.",
      "Elżbieta Janicka & Wojciech Wilczyk, *New Town*, Solidarności St., April 15, 2011.",
      "Elżbieta Janicka & Wojciech Wilczyk, *New Town*, Śliska St., April 15, 2011.",
    ]}
  />
</CarouselSlide>

<CenterImageSlide
  image={props.localImages[1]}
  caption="Elżbieta Janicka & Wojciech Wilczyk, *New Town*, Prosta and Żelazna St., April 08, 2011."
/>

<CenterImageSlide
  image={props.localImages[4]}
  caption="Elżbieta Janicka & Wojciech Wilczyk, *New Town*, Śliska St., April 15, 2011."
/>
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
