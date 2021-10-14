import React, { useContext } from "react"
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image"
import * as Styled from "./style"
import { ImagesContext } from "src/context/illustrations-context"

interface Props {
  closeMenu: () => void
}

const Illustrations: React.FC<Props> = ({ closeMenu }) => {
  const { images } = useContext(ImagesContext)

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
