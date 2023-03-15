import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useEffect } from "react"
import useScrollPause from "src/hooks/useScrollPause"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"
import { useRefEffect } from "src/hooks/useRefEffect"
import panzoom from "panzoom"
import * as Styled from "./style"

import XSVG from "src/images/icons/x.svg"

type Props = { image: IGatsbyImageData; alt: string; close: () => void }

const Fullsize: React.FC<Props> = ({ image, alt, close }) => {
  const { pauseScroll, resumeScroll } = useScrollPause()
  const { themeMode } = useThemeSwitcherContext()

  const [_, setRef] = useRefEffect<HTMLDivElement>(node => {
    const instance = panzoom(node, {
      bounds: true,
      boundsPadding: 0.1,
    })
    return () => instance.dispose()
  }, [])

  useEffect(() => pauseScroll(), [])

  const filter = themeMode === THEME_MODES.DARK ? "invert(1)" : "none"

  return (
    <Styled.Fullscreen $noConstraint>
      <Styled.ScrollableContainer ref={setRef}>
        <GatsbyImage
          style={{
            aspectRatio: `${image.width} / ${image.height}`,
            maxHeight: "100vh",
            objectFit: "contain",
          }}
          imgStyle={{
            aspectRatio: `${image.width} / ${image.height}`,
            objectFit: "contain",
          }}
          image={image}
          alt={alt}
        />
      </Styled.ScrollableContainer>
      <Styled.CloseButton
        onTouchEnd={() => {
          close()
          resumeScroll()
        }}
        onClick={e => {
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
