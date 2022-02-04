import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"
import Slide from "../slide"
import * as Styled from "./style"

interface Props {
  image: IGatsbyImageData
  background?: string
  fit?: "cover" | "contain"
}

const CenterImageSlide: React.FC<Props> = ({
  background,
  image,
  fit = "contain",
}) => {
  const img = getImage(image) as IGatsbyImageData

  return (
    <Slide background={background}>
      <Styled.SlideImageWrapper fullscreen={fit === "cover"}>
        <GatsbyImage
          image={img}
          style={{ flex: "1 1 auto" }}
          objectFit={fit}
          alt="Slide image"
        />
      </Styled.SlideImageWrapper>
    </Slide>
  )
}

export default CenterImageSlide
