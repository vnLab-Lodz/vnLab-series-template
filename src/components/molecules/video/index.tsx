import React from "react"
import * as Styled from "./style"

interface Props {
  src: any
  cover?: boolean
  [key: string]: any
}

const Video: React.FC<Props> = ({ src, cover = false, ...props }) => {
  return (
    <Styled.VideoWrapper className="mdx-video" data-cover={cover}>
      <Styled.Video data-cover={cover} {...props}>
        <source src={src} type="video/mp4" />
      </Styled.Video>
    </Styled.VideoWrapper>
  )
}

export default Video
