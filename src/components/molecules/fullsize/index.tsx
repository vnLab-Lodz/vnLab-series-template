import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useEffect } from "react"
import useScrollPause from "src/hooks/useScrollPause"
import * as Styled from "./style"

import XSVG from "src/images/icons/x.svg"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"

type Props = { image: IGatsbyImageData; alt: string; close: () => void }

const Fullsize: React.FC<Props> = ({ image, alt, close }) => {
  const { pauseScroll, resumeScroll } = useScrollPause()

  const { themeMode } = useThemeSwitcherContext()

  const filter = themeMode === THEME_MODES.DARK ? "invert(1)" : "none"

  useEffect(() => {
    pauseScroll()
  }, [])

  return (
    <Styled.Fullscreen $noConstraint>
      <Styled.ScrollableContainer>
        <Styled.Overflow
          style={{
            aspectRatio: `${image.width} / ${image.height}`,
            height: image.height,
            width: image.width,
          }}
        >
          <GatsbyImage
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
            image={image}
            alt={alt}
          />
        </Styled.Overflow>
      </Styled.ScrollableContainer>
      <Styled.CloseButton
        onClick={() => {
          close()
          resumeScroll()
        }}
      >
        <img src={XSVG} alt="Close" style={{ filter, height: 16, width: 16 }} />
      </Styled.CloseButton>
    </Styled.Fullscreen>
  )
}

export default Fullsize
