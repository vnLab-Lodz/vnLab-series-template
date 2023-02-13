import React, { IframeHTMLAttributes, useMemo, useState } from "react"
import * as Styled from "./style"

type Props = {
  withThumbnailOverlay?: boolean
  cover?: boolean
} & IframeHTMLAttributes<any>

const VimeoIframe: React.FC<Props> = ({
  src,
  withThumbnailOverlay,
  cover = false,
  ...props
}) => {
  const [isInteractive, setIsInteractive] = useState(false)

  const source = useMemo(() => {
    if (!src) return undefined
    if (!withThumbnailOverlay) return src

    const hasParams = src.includes("?")
    const prefix = hasParams ? "&" : "?"
    return src.concat(
      `${prefix}controls=${isInteractive}&autoplay=${isInteractive}`
    )
  }, [isInteractive, src, withThumbnailOverlay])

  return (
    <Styled.IframeWrapper className="mdx-vimeo" data-cover={cover}>
      {withThumbnailOverlay && (
        <Styled.PlaySVG
          $isVisible={!isInteractive}
          onClick={() => setIsInteractive(true)}
          xmlns="http://www.w3.org/2000/svg"
          width="69"
          height="80"
          viewBox="0 0 69 80"
        >
          <g
            id="Polygon_1"
            data-name="Polygon 1"
            transform="translate(69) rotate(90)"
            fill="#fff"
          >
            <path
              d="M 79.13220977783203 68.5 L 0.8677937388420105 68.5 L 40 0.9969441890716553 L 79.13220977783203 68.5 Z"
              stroke="none"
            />
            <path
              d="M 40 1.993904113769531 L 1.735595703125 68 L 78.264404296875 68 L 40 1.993904113769531 M 40 0 L 80 69 L 0 69 L 40 0 Z"
              stroke="none"
              fill="#000000"
            />
          </g>
        </Styled.PlaySVG>
      )}
      <iframe {...props} src={source} />
    </Styled.IframeWrapper>
  )
}

export default VimeoIframe
