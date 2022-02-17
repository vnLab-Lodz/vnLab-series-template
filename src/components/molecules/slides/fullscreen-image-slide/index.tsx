import { IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"
import { CaptionProps } from "../caption-slide"
import CenterImageSlide from "../center-image-slide"

interface Props {
  image: IGatsbyImageData
  background?: string
}

const FullscreenImageSlide: React.FC<Props & CaptionProps> = ({
  background,
  extendedCaption,
  caption,
  image,
}) => {
  return (
    <CenterImageSlide
      background={background}
      image={image}
      fit="cover"
      caption={caption}
      extendedCaption={extendedCaption}
    />
  )
}

export default FullscreenImageSlide
