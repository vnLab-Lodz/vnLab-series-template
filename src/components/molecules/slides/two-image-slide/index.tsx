import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useEffect, useState } from "react"
import { useTheme } from "styled-components"
import * as Styled from "./style"

interface Props {
  image1: IGatsbyImageData
  image2: IGatsbyImageData
  background?: string
  direction: "column" | "row"
}

const useScreenDimensions = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const handleResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return { width, height }
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

  const { width, height } = useScreenDimensions()

  useEffect(() => {
    if (width >= 768 && height > 414) {
      setLayout(direction)
      return
    }

    if (width > height) setLayout("row")
    else setLayout("column")
  }, [width, height])

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
