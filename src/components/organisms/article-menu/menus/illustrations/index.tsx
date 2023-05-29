import React from "react"
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image"
import * as Styled from "./style"
import { Image } from "src/context/illustrations-context"

interface Props {
  closeMenu: (callback?: () => void) => void
  images: Image[]
}

const Illustrations: React.FC<Props> = ({ closeMenu, images }) => {
  return (
    <Styled.IllustrationsWrapper>
      {images.map(({ imageData, calculatePosition, scrollIntoView }, index) => (
        <Styled.IllustrationButton
          onClick={e => {
            console.log(e)
            console.log("hello")

            closeMenu(() => {
              if (scrollIntoView) {
                scrollIntoView()
                return
              }

              window.scrollTo({
                top: calculatePosition(),
                behavior: "smooth",
              })
            })
          }}
        >
          <GatsbyImage
            style={{ aspectRatio: "1" }}
            key={`article-menu__illustration--${index}`}
            image={getImage(imageData) as IGatsbyImageData}
            alt={`Article image ${index}`}
          />
        </Styled.IllustrationButton>
      ))}
    </Styled.IllustrationsWrapper>
  )
}

export default Illustrations
