import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useEffect, useState } from "react"
import useScreenDimensions from "src/hooks/useScreenDimensions"
import CaptionSlide, { CaptionProps } from "../caption-slide"
import * as Styled from "./style"

interface Props {
  image1: IGatsbyImageData
  image2: IGatsbyImageData
  background?: string
  direction: "column" | "row"
}

const TwoImageSlide: React.FC<Props & CaptionProps> = ({
  background,
  caption,
  extendedCaption,
  image1,
  image2,
  direction = "row",
}) => {
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
    <CaptionSlide
      background={background}
      caption={caption}
      extendedCaption={extendedCaption}
    >
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
    </CaptionSlide>
  )
}

export default TwoImageSlide
