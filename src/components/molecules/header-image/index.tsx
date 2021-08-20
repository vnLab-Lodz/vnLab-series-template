import React from "react"
import * as Styled from "./style"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"

interface Props {
  image: any
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
