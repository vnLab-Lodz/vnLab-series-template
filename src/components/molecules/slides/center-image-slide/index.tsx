import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"
import CaptionSlide, { CaptionProps } from "../caption-slide"
import * as Styled from "./style"

interface Props {
  image: IGatsbyImageData
  background?: string
  fit?: "cover" | "contain"
}

const CenterImageSlide: React.FC<Props & CaptionProps> = ({
  background,
  image,
  fit = "contain",
  caption,
  extendedCaption,
}) => {
  const img = getImage(image) as IGatsbyImageData

  const isFullscreen = fit === "cover"

  return (
    <CaptionSlide
      fullscreen={isFullscreen}
      background={background}
      caption={caption}
      extendedCaption={extendedCaption}
    >
      <Styled.SlideImageWrapper
        fullscreen={isFullscreen}
        withCaption={!!caption}
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
