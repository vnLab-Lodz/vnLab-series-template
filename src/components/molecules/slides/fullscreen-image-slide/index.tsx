import { IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"
import CenterImageSlide from "../center-image-slide"

interface Props {
  image: IGatsbyImageData
  background?: string
}

const FullscreenImageSlide: React.FC<Props> = ({ background, image }) => {
  return <CenterImageSlide background={background} image={image} fit="cover" />
}

export default FullscreenImageSlide
