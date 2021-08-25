import { AnimatePresence, motion } from "framer-motion"
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image"
import React, { useLayoutEffect } from "react"
import ReactDOM from "react-dom"
import * as Styled from "./style"

//@ts-ignore
import LeftArrowSVG from "../../../images/icons/arrow_left.svg"
//@ts-ignore
import RightArrowSVG from "../../../images/icons/arrow_right.svg"
//@ts-ignore
import CloseSVG from "../../../images/icons/x.svg"

interface Props {
  carouselUid: string
  images: ImageDataLike[]
  captions: string[]
  currentImage: number
  nextImage: () => void
  previousImage: () => void
  exitFullscreen: () => void
}

const FullscreenPortal: React.FC<Props> = ({
  carouselUid,
  images,
  captions,
  currentImage,
  nextImage,
  previousImage,
  exitFullscreen,
}) => {
  useLayoutEffect(() => {
    document.body.classList.add("no-scroll")
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [])

  const uid = `fullscreen-carousel-${carouselUid}__image--${currentImage}`

  return ReactDOM.createPortal(
    <Styled.Fullscreen
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Styled.CloseBtn onClick={exitFullscreen}>
        <img src={CloseSVG} alt="Close fullscreen icon" />
      </Styled.CloseBtn>
      <Styled.FullscreenArrow side="left" onClick={previousImage}>
        <img src={LeftArrowSVG} alt="Left arrow" />
      </Styled.FullscreenArrow>
      <Styled.FullscreenSlider>
        <AnimatePresence initial={false} exitBeforeEnter>
          <Styled.SliderImage
            key={uid}
            id={uid}
            fullscreen
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GatsbyImage
              image={getImage(images[currentImage]) as IGatsbyImageData}
              alt={`Carousel image ${currentImage}`}
            />
            <Styled.ImageCaption>{captions[currentImage]}</Styled.ImageCaption>
          </Styled.SliderImage>
        </AnimatePresence>
      </Styled.FullscreenSlider>
      <Styled.FullscreenArrow side="right" onClick={nextImage}>
        <img src={RightArrowSVG} alt="Right arrow" />
      </Styled.FullscreenArrow>
      <Styled.FullscreenCount>
        {currentImage + 1}/{images.length}
      </Styled.FullscreenCount>
      <Styled.FullscreenCaption>
        {captions[currentImage]}
      </Styled.FullscreenCaption>
    </Styled.Fullscreen>,
    document.body
  )
}

export default FullscreenPortal
