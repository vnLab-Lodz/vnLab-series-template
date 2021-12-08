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
import * as Styled from "./style"
import { InnerGrid } from "~styles/grid"
import FullscreenPortal from "./fullscreen"
import { v4 as uuid } from "uuid"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"
import useIsMobile from "src/hooks/useIsMobile"
import useIsClient from "src/hooks/useIsClient"

//@ts-ignore
import LeftArrowSVG from "../../../images/icons/arrow_left.svg"
//@ts-ignore
import RightArrowSVG from "../../../images/icons/arrow_right.svg"
//@ts-ignore
import ExpandArrow from "../../../images/icons/arrow_expand.svg"

import * as New from "./newStyle"

interface Props {
  images: ImageDataLike[]
  captions: string[]
}

const Carousel: React.FC<Props> = ({ images, captions }) => {
  const { addImage } = useContext(ImagesContext)
  const ref = useRef<HTMLDivElement | null>(null)
  const touchRef = useRef<boolean>(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const carouselUid = useMemo(() => uuid(), [images])
  const isMobile = useIsMobile()
  const { key } = useIsClient()

  const calcScrollPos = () => {
    if (!ref || !ref.current) return 0

    return ref.current.offsetTop
  }

  const nextImage = () => {
    touchRef.current = true
    setCurrentImage(prev => (prev >= images.length - 1 ? prev : prev + 1))
  }

  const previousImage = () => {
    touchRef.current = true
    setCurrentImage(prev => (prev <= 0 ? prev : prev - 1))
  }

  const getScrollOffset = () => {
    const { innerWidth } = window
    const unit = innerWidth / 32
    if (innerWidth < 768) return unit

    return innerWidth < 1024 ? unit * 6 : unit * 8
  }

  const onScroll: React.UIEventHandler<HTMLDivElement> = e => {
    if (!ref.current) return

    const offset = getScrollOffset()
    const selector = `#${getWrapperKey(currentImage)}`
    const wrapper = ref.current.querySelector<HTMLDivElement>(selector)
    const imgPosition = wrapper ? wrapper.offsetLeft - offset : 0
    const { scrollLeft } = e.currentTarget
    const distance = imgPosition - scrollLeft

    if (touchRef.current === true) {
      if (distance < 1 && distance > -1) touchRef.current = false
      return
    }

    if (distance > 10) previousImage()
    else if (distance < -10) nextImage()
  }

  const onTouchStart: React.UIEventHandler<HTMLDivElement> = e => {
    e.currentTarget.style.overflowX = "scroll"
  }

  const onTouchEnd: React.UIEventHandler<HTMLDivElement> = e => {
    e.currentTarget.style.overflowX = "hidden"
  }

  const onImgClick = useCallback(
    () => !isMobile && setFullscreen(true),
    [isMobile, setFullscreen]
  )

  const getWrapperKey = (index: number) =>
    `carousel-${carouselUid}__wrapper--${index}`

  useEffect(() => {
    const scrollPos = calcScrollPos()
    images.forEach(img => addImage(img as IGatsbyImageData, scrollPos))
  }, [ref])

  useEffect(() => {
    if (isMobile && fullscreen) setFullscreen(false)
  }, [isMobile])

  useEffect(() => {
    if (!ref.current) return

    const offset = getScrollOffset()
    const selector = `#${getWrapperKey(currentImage)}`
    const wrapper = ref.current.querySelector<HTMLDivElement>(selector)
    const imgPosition = wrapper ? wrapper.offsetLeft - offset : 0

    ref.current.scrollTo({ left: imgPosition, behavior: "smooth" })
  }, [currentImage])

  return (
    <React.Fragment key={key}>
      <New.ViewportConstraint sticky>
        <New.Slider
          ref={ref}
          onScroll={onScroll}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {images.map((image, index) => (
            <Image
              key={getWrapperKey(index)}
              index={index}
              onClick={onImgClick}
              carouselUid={carouselUid}
              caption={captions[index]}
              image={image as IGatsbyImageData}
            />
          ))}
        </New.Slider>
        <New.Controls>
          <New.CarouselNav>
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
                <img src={ExpandArrow} alt="Expand arrow" />
              </Styled.Expand>
            </InnerGrid>
          </New.CarouselNav>
        </New.Controls>
      </New.ViewportConstraint>
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
  caption: string
  onClick: () => void
  image: IGatsbyImageData
  index: number
  carouselUid: string
}> = React.memo(({ carouselUid, index, caption, image, onClick }) => (
  <New.ImageWrapper id={`carousel-${carouselUid}__wrapper--${index}`}>
    <New.Image
      objectFit="cover"
      alt={`${caption} | Carousel image ${index}`}
      image={getImage(image) as IGatsbyImageData}
      onClick={onClick}
    />
    <New.Caption>
      <ReactMarkdown
        components={{ ...mdxComponents, p: Styled.ImageCaption } as any}
      >
        {caption}
      </ReactMarkdown>
    </New.Caption>
  </New.ImageWrapper>
))

export default Carousel
