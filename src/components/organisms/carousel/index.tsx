import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { getImage, IGatsbyImageData, ImageDataLike } from "gatsby-plugin-image"
import { ImagesContext } from "src/context/illustrations-context"
import { InnerGrid } from "~styles/grid"
import FullscreenPortal from "./fullscreen"
import { v4 as uuid } from "uuid"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"
import useIsMobile from "src/hooks/useIsMobile"
import { useInView } from "react-intersection-observer"
import { useAnimation } from "framer-motion"
import useIsClient from "src/hooks/useIsClient"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"
import useScrollDistance from "src/hooks/useScrollDistance"
import * as Styled from "./style"

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
  const constraintRef = useRef<HTMLDivElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)

  const [currentImage, setCurrentImage] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [sticky, setSticky] = useState(false)

  const [inViewRef, isInView] = useInView({ threshold: 0.1 })
  const { addImage } = useContext(ImagesContext)
  const isMobile = useIsMobile()
  const { key } = useIsClient()

  const controls = useAnimation()

  const carouselUid = useMemo(() => uuid(), [images])

  const { themeMode } = useThemeSwitcherContext()

  const calcScrollPos = () => {
    if (!stickyRef || !stickyRef.current) return 0

    return stickyRef.current.offsetTop
  }

  const getNextIndex = () =>
    currentImage >= images.length - 1 ? currentImage : currentImage + 1

  const getPrevIndex = () =>
    currentImage <= 0 ? currentImage : currentImage - 1

  const nextImage = () => scrollToImage(getNextIndex())

  const previousImage = () => scrollToImage(getPrevIndex())

  const getScrollOffset = () => {
    const { innerWidth } = window
    const unit = innerWidth / 32
    if (innerWidth < 768) return unit

    return innerWidth < 1024 ? unit * 6 : unit * 8
  }

  const getImagePosition = (index: number) => {
    if (!ref.current) return 0

    const offset = getScrollOffset()
    const selector = `#${getWrapperKey(index)}`
    const wrapper = ref.current.querySelector<HTMLDivElement>(selector)

    return wrapper ? wrapper.offsetLeft - offset : 0
  }

  const scrollToImage = (index: number) => {
    if (!ref.current) return

    const left = getImagePosition(index)

    ref.current.scrollTo({ left, behavior: fullscreen ? undefined : "smooth" })
  }

  const onScroll = useScrollDistance(
    () => {
      console.log(ref.current)

      if (!ref.current) return

      const { scrollLeft } = ref.current
      console.log(scrollLeft)

      const imgPosition = getImagePosition(currentImage)
      console.log(imgPosition)

      const distance = imgPosition - scrollLeft

      console.log(distance)

      if (distance > 300) setCurrentImage(getPrevIndex())
      else if (distance < -300) setCurrentImage(getNextIndex())
    },
    66,
    "x"
  )

  const onImgClick = useCallback(
    () => !isMobile && setFullscreen(true),
    [isMobile, setFullscreen]
  )

  const getWrapperKey = (index: number) =>
    `carousel-${carouselUid}__wrapper--${index}`

  const getImageMargin = (index: number) => {
    if (index === 0) return "right"
    if (index === images.length - 1) return "left"
    return "both"
  }

  useEffect(() => inViewRef(constraintRef.current), [constraintRef])

  useEffect(() => {
    images.forEach(img =>
      addImage(img as IGatsbyImageData, calcScrollPos, () => {
        stickyRef.current?.scrollIntoView({ behavior: "smooth" })
      })
    )
  }, [stickyRef])

  useEffect(() => {
    if (isMobile && fullscreen) setFullscreen(false)
  }, [isMobile])

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

  return (
    <React.Fragment key={key}>
      <Styled.ViewportConstraint ref={constraintRef} animate={controls}>
        <Styled.Absolute flexible ref={stickyRef} sticky={sticky}>
          <Styled.Slider ref={ref} onScroll={onScroll}>
            <Styled.ImageSpacer />
            {images.map((image, index) => (
              <Image
                key={getWrapperKey(index)}
                index={index}
                margin={getImageMargin(index)}
                onClick={onImgClick}
                carouselUid={carouselUid}
                caption={captions[index]}
                image={image as IGatsbyImageData}
              />
            ))}
            <Styled.ImageSpacer />
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
                  {currentImage + 1}/{images.length}
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
                <Styled.Expand onClick={() => setFullscreen(true)}>
                  <img
                    src={ExpandArrow}
                    alt="Expand arrow"
                    style={{
                      filter:
                        themeMode === THEME_MODES.DARK ? "invert(1)" : "none",
                    }}
                  />
                </Styled.Expand>
              </InnerGrid>
            </Styled.CarouselNav>
          </Styled.Controls>
        </Styled.Absolute>
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

const Image: React.FC<{
  margin: "both" | "left" | "right"
  caption: string
  onClick: () => void
  image: IGatsbyImageData
  index: number
  carouselUid: string
}> = React.memo(({ carouselUid, index, caption, image, onClick, margin }) => (
  <Styled.ImageWrapper
    id={`carousel-${carouselUid}__wrapper--${index}`}
    margin={margin}
  >
    <Styled.Image
      objectFit="cover"
      alt={`${caption} | Carousel image ${index}`}
      image={getImage(image) as IGatsbyImageData}
      onClick={onClick}
    />
    <Styled.Caption>
      <ReactMarkdown
        components={{ ...mdxComponents, p: Styled.ImageCaption } as any}
      >
        {caption}
      </ReactMarkdown>
    </Styled.Caption>
  </Styled.ImageWrapper>
))

export default Carousel
