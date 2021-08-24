import React from "react"
import * as Styled from "./style"
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image"

interface Props {
  image: ImageDataLike
  alt?: string
}

const HeaderImage: React.FC<Props> = ({ image, alt }) => {
  return (
    <Styled.HeaderImageWrapper>
      <GatsbyImage
        image={getImage(image) as IGatsbyImageData}
        alt={alt ?? "Header image"}
      />
    </Styled.HeaderImageWrapper>
  )
}

export default HeaderImage
