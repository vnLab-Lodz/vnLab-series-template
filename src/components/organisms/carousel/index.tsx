import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import { getImage, IGatsbyImageData, ImageDataLike } from "gatsby-plugin-image"
import { ImagesContext } from "src/context/illustrations-context"
import * as Styled from "./style"
import { GridConstraint, InnerGrid } from "~styles/grid"
import { GatsbyImage } from "gatsby-plugin-image"
import { motion, PanInfo, useSpring } from "framer-motion"
import FullscreenPortal from "./fullscreen"
import { PanEvent } from "~types"
import { v4 as uuid } from "uuid"
import useIsClient from "src/hooks/useIsClient"

//@ts-ignore
import LeftArrowSVG from "../../../images/icons/arrow_left.svg"
//@ts-ignore
import RightArrowSVG from "../../../images/icons/arrow_right.svg"
//@ts-ignore
import ExpandArrow from "../../../images/icons/arrow_expand.svg"

interface Props {
  images: ImageDataLike[]
  captions: string[]
}

const Carousel: React.FC<Props> = ({ images, captions }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)
  const imagesClickable = useRef<boolean>(true)
  const constraintRef = useRef<HTMLDivElement | null>(null)
  const [viewportOffset, setViewportOffset] = useState(0)
  const [navOffset, setNavOffset] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const carouselUid = useMemo(() => uuid(), [images])
  const [fullscreen, setFullscreen] = useState(false)
  const { key } = useIsClient()
  const { addImage } = useContext(ImagesContext)

  const translateX = useSpring(0)

  const determineViewportOffset = () => {
    if (!ref || !ref.current) return

    setViewportOffset(ref.current.offsetLeft)
  }

  const calcScrollPos = () => {
    if (!ref || !ref.current) return 0

    return ref.current.offsetTop - 130
  }

  useEffect(() => {
    determineViewportOffset()
    images.forEach(img => addImage(img as IGatsbyImageData, calcScrollPos()))
    window.addEventListener("resize", determineViewportOffset)

    return () => {
      window.removeEventListener("resize", determineViewportOffset)
    }
  }, [ref])

  useEffect(() => {
    const img = document.querySelector<HTMLDivElement>(
      `#carousel-${carouselUid}__image--${currentImage}`
    )

    img && translateX.set((img.offsetLeft - viewportOffset) * -1)
  }, [currentImage, viewportOffset])

  useEffect(() => {
    navRef.current &&
      setNavOffset((navRef.current.offsetLeft - viewportOffset) * -1)
  }, [viewportOffset])

  const getSliderMargins = () => {
    if (!ref || !ref.current || !constraintRef || !constraintRef.current)
      return { start: 0, end: 0 }

    const { offsetLeft, offsetWidth } = constraintRef.current
    const start = offsetLeft
    const end = ref.current.offsetWidth - offsetLeft - offsetWidth

    return { start, end }
  }

  const getSliderImageWidth = () => {
    if (!constraintRef || !constraintRef.current) return "50vw"

    return constraintRef.current.offsetWidth
  }

  const nextImage = () =>
    setCurrentImage(prev => (prev >= images.length - 1 ? prev : prev + 1))

  const previousImage = () =>
    setCurrentImage(prev => (prev <= 0 ? prev : prev - 1))

  const onPanStart = () => {
    imagesClickable.current = false
  }

  const onPan = (_: PanEvent, point: PanInfo) => {
    translateX.stop()
    const offsetX = point.offset.x

    if (point.offset.y > 50 || point.offset.y < -50) {
      return
    }

    if (currentImage === 0 && offsetX > 0) return

    if (currentImage === images.length - 1) return

    const currentTranslation = translateX.get()
    translateX.set(currentTranslation + offsetX)
  }

  const onPanEnd = (_: PanEvent, point: PanInfo) => {
    translateX.stop()

    if (point.offset.y > 50 || point.offset.y < -50) {
      window.scrollTo({
        top: document.documentElement.scrollTop - 3 * point.offset.y,
        behavior: "smooth",
      })
      return
    }

    if (point.offset.x > 0) previousImage()
    else nextImage()

    setTimeout(() => {
      imagesClickable.current = true
    }, 600)
  }

  const onImgClick = () => imagesClickable.current && setFullscreen(true)

  const { start, end } = getSliderMargins()
  const width = getSliderImageWidth()

  return (
    <React.Fragment key={key}>
      <Styled.ViewportConstraint
        ref={ref}
        style={{ transform: `translatex(-${viewportOffset}px)` }}
      >
        <Styled.PanableGrid
          as={motion.div}
          onPanStart={onPanStart}
          onPan={onPan}
          onPanEnd={onPanEnd}
        >
          <Styled.Slider as={motion.div} style={{ translateX }}>
            {images.map((image, index) => {
              const uid = `carousel-${carouselUid}__image--${index}`

              return (
                <Styled.SliderImage
                  key={uid}
                  id={uid}
                  marginStart={start}
                  marginEnd={end}
                  style={{ width }}
                  onClick={onImgClick}
                >
                  <GatsbyImage
                    style={{ width: "100%", height: "100%" }}
                    image={getImage(image) as IGatsbyImageData}
                    alt={`Carousel image ${index}`}
                  />
                  <Styled.ImageCaption>{captions[index]}</Styled.ImageCaption>
                </Styled.SliderImage>
              )
            })}
          </Styled.Slider>
          <GridConstraint ref={constraintRef} style={{ gridRow: 2 }}>
            <Styled.CarouselNav
              ref={navRef}
              style={{ transform: `translateX(${navOffset}px)` }}
            >
              <InnerGrid>
                <Styled.Arrow side="left" onClick={previousImage}>
                  <img src={LeftArrowSVG} alt="Left arrow" />
                </Styled.Arrow>
                <Styled.ImageCount>
                  {currentImage + 1}/{images.length}
                </Styled.ImageCount>
                <Styled.Arrow side="right" onClick={nextImage}>
                  <img src={RightArrowSVG} alt="Right arrow" />
                </Styled.Arrow>
                <Styled.Expand onClick={() => setFullscreen(true)}>
                  <img src={ExpandArrow} alt="Exapnd arrow" />
                </Styled.Expand>
              </InnerGrid>
            </Styled.CarouselNav>
          </GridConstraint>
        </Styled.PanableGrid>
      </Styled.ViewportConstraint>
      {fullscreen && (
        <FullscreenPortal
          carouselUid={carouselUid}
          images={images}
          captions={captions}
          currentImage={currentImage}
          nextImage={nextImage}
          previousImage={previousImage}
          exitFullscreen={() => setFullscreen(false)}
        />
      )}
    </React.Fragment>
  )
}

export default Carousel
