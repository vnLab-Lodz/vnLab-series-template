import { AnimatePresence, motion } from "framer-motion"
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image"
import React, { useEffect, useLayoutEffect, useContext } from "react"
import ReactDOM from "react-dom"
import * as Styled from "./style"
import useHypothesis from "src/hooks/useHypothesis"
import ReactMarkdown from "react-markdown"
import { mdxComponents } from "src/templates/chapter"

//@ts-ignore
import LeftArrowSVG from "../../../images/icons/arrow_left.svg"
//@ts-ignore
import RightArrowSVG from "../../../images/icons/arrow_right.svg"
//@ts-ignore
import CloseSVG from "../../../images/icons/x.svg"
import { NavMenuContext, NAV_MODES } from "../navigation-menu/nav-menu-context"

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
  const { hypothesis, hideHypothesis } = useHypothesis()
  const { setNavMode } = useContext(NavMenuContext)

  useLayoutEffect(() => {
    document.body.classList.add("no-scroll")
    setNavMode(NAV_MODES.DARK)
    return () => {
      setNavMode(NAV_MODES.LIGHT)
      document.body.classList.remove("no-scroll")
    }
  }, [])

  useEffect(() => {
    hideHypothesis()

    const btn = document.getElementById("hypothesis-btn")
    btn?.classList.add("invisible")

    return () => {
      btn?.classList.remove("invisible")
    }
  }, [hypothesis])

  const uid = `fullscreen-carousel-${carouselUid}__image--${currentImage}`

  const image = getImage(images[currentImage]) as IGatsbyImageData

  const aspectRatio = `${image.width}/${image.height}`

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
              image={image}
              alt={`Carousel image ${currentImage}`}
              style={{ aspectRatio }}
            />
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
        <ReactMarkdown
          components={{ ...mdxComponents, p: Styled.FullscreenCaption } as any}
        >
          {captions[currentImage]}
        </ReactMarkdown>
      </Styled.FullscreenCaption>
    </Styled.Fullscreen>,
    document.body
  )
}

export default FullscreenPortal
