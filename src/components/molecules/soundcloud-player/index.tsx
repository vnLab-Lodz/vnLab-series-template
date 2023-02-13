import { Script, ScriptStrategy } from "gatsby"
import React, { IframeHTMLAttributes, useEffect, useState } from "react"
import { useRefEffect } from "src/hooks/useRefEffect"
import * as Styled from "./style"

type Props = IframeHTMLAttributes<HTMLIFrameElement>

const SoundCloudPlayer: React.FC<Props> = props => {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (typeof document === "undefined") return

    const script = document.getElementById("soundcloud-player-api")
    if (!!script) setScriptLoaded(true)
  }, [])

  const [ref, setRef] = useRefEffect<HTMLIFrameElement>(node => {
    const observer = new IntersectionObserver(entries => {
      setIsInView(entries[0]?.isIntersecting ?? false)
    })

    observer.observe(node)

    return () => observer.unobserve(node)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    // @ts-expect-error
    if (!window?.SC) return

    // @ts-expect-error
    const widget = window.SC.Widget(ref.current)

    if (!isInView) widget.pause()
    else if (props.allow?.includes("autoplay")) widget.play()
  }, [isInView, scriptLoaded, ref.current])

  return (
    <>
      <Script
        id="soundcloud-player-api"
        src="https://w.soundcloud.com/player/api.js"
        strategy={ScriptStrategy.postHydrate}
        onLoad={() => setScriptLoaded(true)}
      />
      <Styled.Iframe ref={setRef} width="100%" {...props} />
    </>
  )
}

export default SoundCloudPlayer
