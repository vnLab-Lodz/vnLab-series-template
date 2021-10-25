import React from "react"
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image"
import * as Styled from "./style"
import { Image } from "src/context/illustrations-context"

interface Props {
  closeMenu: () => void
  images: Image[]
}

const Illustrations: React.FC<Props> = ({ closeMenu, images }) => {
  const scrollToImage = (position: number) => {
    closeMenu()
    window.scrollTo({ top: position, behavior: "smooth" })
  }

  return (
    <Styled.IllustrationsWrapper>
      {images.map(({ imageData, position }, index) => (
        <GatsbyImage
          style={{ cursor: "pointer", aspectRatio: "1" }}
          key={`article-menu__illustration--${index}`}
          image={getImage(imageData) as IGatsbyImageData}
          alt={`Article image ${index}`}
          onClick={() => scrollToImage(position)}
        />
      ))}
    </Styled.IllustrationsWrapper>
  )
}

export default Illustrations
