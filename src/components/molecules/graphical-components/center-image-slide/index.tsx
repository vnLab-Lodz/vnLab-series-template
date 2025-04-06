import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useContext, useEffect, useRef } from "react"
import { ImagesContext } from "src/context/illustrations-context"
import CaptionSlide, { CaptionProps } from "../caption-slide"
import * as Styled from "./style"

interface Props {
  image: IGatsbyImageData
  fit?: "cover" | "contain"
}

const CenterImageSlide: React.FC<Props & CaptionProps> = ({
  image,
  fit = "contain",
  caption,
  extendedCaption,
}) => {
  const img = getImage(image) as IGatsbyImageData
  const isFullscreen = fit === "cover"

  const { addImage } = useContext(ImagesContext)
  const ref = useRef<HTMLDivElement>(null)

  const calculateScrollPosition = () => {
    if (!ref || !ref.current) return 0
    return ref.current.offsetTop
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      addImage(image, calculateScrollPosition, () =>
        ref.current?.scrollIntoView({ behavior: "smooth" })
      )
    }, 66)

    return () => clearTimeout(timeout)
  }, [ref])

  return (
    <CaptionSlide caption={caption} extendedCaption={extendedCaption}>
      {({ button, caption }) => (
        <>
          <Styled.SlideImageWrapper
            ref={ref}
            data-fullscreen={isFullscreen}
            $fullscreen={isFullscreen}
            $withCaption={!!caption}
          >
            <Styled.Image>
              <GatsbyImage
                image={img}
                objectFit={fit}
                alt="Slide image"
                style={{ aspectRatio: `${img.width} / ${img.height}` }}
              />
              {button}
            </Styled.Image>
            {caption}
          </Styled.SlideImageWrapper>
          {isFullscreen && <div style={{ height: "100px" }} />}
        </>
      )}
    </CaptionSlide>
  )
}

export default CenterImageSlide
