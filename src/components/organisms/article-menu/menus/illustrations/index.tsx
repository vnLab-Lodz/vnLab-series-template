import React from "react"
import {
  GatsbyImage,
  IGatsbyImageData,
  getImage,
  ImageDataLike,
} from "gatsby-plugin-image"
import * as Styled from "./style"

interface Props {
  images: ImageDataLike[]
}

const Illustrations: React.FC<Props> = ({ images }) => {
  return (
    <Styled.IllustrationsWrapper>
      {images.map((image, index) => (
        <GatsbyImage
          image={getImage(image) as IGatsbyImageData}
          alt={`Article image ${index}`}
        />
      ))}
    </Styled.IllustrationsWrapper>
  )
}

export default Illustrations
