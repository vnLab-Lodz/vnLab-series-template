import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"
import { useTheme } from "styled-components"
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
  const theme = useTheme()
  const bgColor = background ?? theme.palette.light

  const img = getImage(image) as IGatsbyImageData

  return (
    <section data-background-color={bgColor}>
      <Styled.SlideImageWrapper fullscreen={fit === "cover"}>
        <GatsbyImage
          image={img}
          style={{ flex: "1 1 auto" }}
          objectFit={fit}
          alt="Slide image"
        />
      </Styled.SlideImageWrapper>
    </section>
  )
}

export default CenterImageSlide
