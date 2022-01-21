import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useState } from "react"
import useIsMobile from "src/hooks/useIsMobile"
import { useTheme } from "styled-components"
import * as Styled from "./style"

interface Props {
  image1: IGatsbyImageData
  image2: IGatsbyImageData
  background?: string
  direction: "column" | "row"
}

const TwoImageSlide: React.FC<Props> = ({
  background,
  image1,
  image2,
  direction = "row",
}) => {
  const theme = useTheme()
  const bgColor = background ?? theme.palette.light
  const [layout, setLayout] = useState(direction)

  useIsMobile(mobile => {
    if (direction == "row") setLayout(layout => (mobile ? "column" : "row"))
  })

  const img1 = getImage(image1) as IGatsbyImageData
  const img2 = getImage(image2) as IGatsbyImageData

  return (
    <section data-background-color={bgColor}>
      <Styled.ImagesContainer direction={layout}>
        <Styled.SlideImageWrapper direction={layout}>
          <GatsbyImage
            image={img1}
            style={{ flex: "1 1 auto" }}
            objectFit="contain"
            alt="Slide image"
          />
        </Styled.SlideImageWrapper>
        <Styled.SlideImageWrapper direction={layout}>
          <GatsbyImage
            image={img2}
            style={{ flex: "1 1 auto" }}
            objectFit="contain"
            alt="Slide image"
          />
        </Styled.SlideImageWrapper>
      </Styled.ImagesContainer>
    </section>
  )
}

export default TwoImageSlide
