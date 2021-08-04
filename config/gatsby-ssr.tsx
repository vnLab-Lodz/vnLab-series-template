import React from "react"
import { RenderBodyArgs } from "gatsby"

export const onRenderBody = ({ setPostBodyComponents }: RenderBodyArgs) => {
  setPostBodyComponents([
    <script key="hypothesis-embed" src="https://hypothes.is/embed.js" async />,
  ])
}
