import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import { getImage, IGatsbyImageData, ImageDataLike } from "gatsby-plugin-image"
import { ImagesContext } from "src/context/illustrations-context"
import { InnerGrid } from "~styles/grid"
import { v4 as uuid } from "uuid"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"
import { useInView } from "react-intersection-observer"
import { useAnimation } from "framer-motion"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"
import Fullsize from "~components/molecules/fullsize"
import ReactDOM from "react-dom"
import * as Styled from "./style"

import LeftArrowSVG from "../../../images/icons/arrow_left.svg"
import ExpandArrow from "src/images/icons/arrow_expand.svg"
import RightArrowSVG from "../../../images/icons/arrow_right.svg"

import { SwiperSlide } from "swiper/react"
import { A11y, Swiper, Mousewheel } from "swiper"

import "swiper/css"
import "swiper/css/navigation"

interface Props {
  images: ImageDataLike[]
  captions: string[]
}

const Carousel: React.FC<Props> = ({ images, captions }) => {
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const [sticky, setSticky] = useState(false)
  const [swiper, setSwiper] = useState<Swiper | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [inViewRef, isInView] = useInView({ threshold: 0.1 })
  const { addImage } = useContext(ImagesContext)
  const controls = useAnimation()
  const { themeMode } = useThemeSwitcherContext()

  const carouselUid = useMemo(() => uuid(), [images])

  const nextImage = () => swiper?.slideNext()

  const previousImage = () => swiper?.slidePrev()

  const calcScrollPosition = () => {
    if (!stickyRef || !stickyRef.current) return 0
    return stickyRef.current.offsetTop
  }

  useEffect(() => {
    images.forEach(img =>
      addImage(img as IGatsbyImageData, calcScrollPosition, () => {
        stickyRef.current?.scrollIntoView({ behavior: "smooth" })
      })
    )
  }, [stickyRef])

  useEffect(() => {
    if (!stickyRef.current) return setSticky(isInView)

    const proportions = stickyRef.current.offsetHeight / window.innerHeight
    if (proportions > 0.8) setSticky(isInView)
    else setSticky(false)
  }, [isInView])

  useEffect(() => {
    const marginBottom = sticky ? "100px" : "0px"
    const duration = sticky ? 0.1 : 0.2
    controls.start({ marginBottom, transition: { duration, ease: "easeIn" } })
  }, [sticky])

  useEffect(() => {
    if (!swiper) return

    const handleSlideChange = (e: Swiper) => {
      setActiveIndex(e.activeIndex)
    }

    swiper.on("slideChange", handleSlideChange)
    return () => {
      swiper.off("slideChange", handleSlideChange)
    }
  }, [swiper, images])

  useEffect(() => {
    if (!swiper) return

    const listener = (e: KeyboardEvent) => {
      if (!isInView) return

      switch (e.key) {
        case "ArrowRight":
          swiper.slideNext()
          break
        case "ArrowLeft":
          swiper.slidePrev()
          break
      }
    }

    window.addEventListener("keydown", listener)
    return () => window.removeEventListener("keydown", listener)
  }, [swiper, isInView])

  return (
    <React.Fragment>
      <Styled.ViewportConstraint
        ref={inViewRef}
        animate={controls}
        className="carousel"
      >
        <Styled.Absolute $flexible ref={stickyRef} sticky={sticky}>
          <Styled.Slider
            a11y={{
              nextSlideMessage: "Next slide",
              prevSlideMessage: "Previous slide",
            }}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 2,
            }}
            modules={[A11y, Mousewheel]}
            spaceBetween={50}
            slidesPerView={1}
            onSwiper={setSwiper}
          >
            {images.map((image, index) => (
              <SwiperSlide key={`carousel-${carouselUid}__wrapper--${index}`}>
                <Styled.Slide>
                  <Image
                    index={index}
                    carouselUid={carouselUid}
                    caption={captions[index]}
                    image={image as IGatsbyImageData}
                  />
                </Styled.Slide>
              </SwiperSlide>
            ))}
          </Styled.Slider>
          <Styled.Controls>
            <Styled.CarouselNav>
              <InnerGrid>
                <Styled.Arrow side="left" onClick={previousImage}>
                  <img
                    src={LeftArrowSVG}
                    alt="Left arrow"
                    style={{
                      filter:
                        themeMode === THEME_MODES.DARK ? "invert(1)" : "none",
                    }}
                  />
                </Styled.Arrow>
                <Styled.ImageCount>
                  {activeIndex + 1}/{images.length}
                </Styled.ImageCount>
                <Styled.Arrow side="right" onClick={nextImage}>
                  <img
                    src={RightArrowSVG}
                    alt="Right arrow"
                    style={{
                      filter:
                        themeMode === THEME_MODES.DARK ? "invert(1)" : "none",
                    }}
                  />
                </Styled.Arrow>
              </InnerGrid>
            </Styled.CarouselNav>
          </Styled.Controls>
        </Styled.Absolute>
      </Styled.ViewportConstraint>
    </React.Fragment>
  )
}

const Image: React.FC<{
  caption: string
  image: IGatsbyImageData
  index: number
  carouselUid: string
}> = ({ carouselUid, index, caption, image }) => {
  const [isFullsize, setIsFullsize] = useState(false)
  const { themeMode } = useThemeSwitcherContext()
  const filter = themeMode === THEME_MODES.DARK ? "invert(1)" : "none"

  const img = getImage(image) as IGatsbyImageData

  return (
    <>
      <Styled.ImageWrapper id={`carousel-${carouselUid}__wrapper--${index}`}>
        <Styled.Image
          objectFit="cover"
          alt={`${caption} | Carousel image ${index}`}
          image={img}
        />
        <Styled.Caption>
          <ReactMarkdown
            components={{ ...mdxComponents, p: Styled.ImageCaption } as any}
          >
            {caption}
          </ReactMarkdown>
          <Styled.Expand onClick={() => setIsFullsize(true)}>
            <img
              src={ExpandArrow}
              alt="Fullsize"
              style={{ filter, height: 16, width: 16 }}
            />
          </Styled.Expand>
        </Styled.Caption>
      </Styled.ImageWrapper>
      {isFullsize
        ? ReactDOM.createPortal(
            <Fullsize
              image={img}
              alt={caption}
              close={() => setIsFullsize(false)}
            />,
            document.body
          )
        : null}
    </>
  )
}

export default Carousel
