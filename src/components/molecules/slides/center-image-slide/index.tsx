import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useContext, useEffect, useRef } from "react"
import { ImagesContext } from "src/context/illustrations-context"
import CaptionSlide, { CaptionProps } from "../caption-slide"
import * as Styled from "./style"

interface Props {
  image: IGatsbyImageData
  fit?: "cover" | "contain"
}

const CenterImageSlide: React.FC<Props & CaptionProps> = ({
  image,
  fit = "contain",
  caption,
  extendedCaption,
}) => {
  const img = getImage(image) as IGatsbyImageData
  const isFullscreen = fit === "cover"

  const { addImage } = useContext(ImagesContext)
  const ref = useRef<HTMLDivElement>(null)

  const calculateScrollPosition = () => {
    if (!ref || !ref.current) return 0
    return ref.current.offsetTop
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      addImage(image, calculateScrollPosition, () =>
        ref.current?.scrollIntoView({ behavior: "smooth" })
      )
    }, 66)

    return () => clearTimeout(timeout)
  }, [ref])

  return (
    <CaptionSlide caption={caption} extendedCaption={extendedCaption}>
      <Styled.SlideImageWrapper
        ref={ref}
        data-fullscreen={isFullscreen}
        $fullscreen={isFullscreen}
        $withCaption={!!caption}
      >
        <GatsbyImage
          image={img}
          style={{ flex: "1 1 auto" }}
          objectFit={fit}
          alt="Slide image"
        />
      </Styled.SlideImageWrapper>
    </CaptionSlide>
  )
}

export default CenterImageSlide
