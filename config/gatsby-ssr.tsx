import { RenderBodyArgs } from "gatsby"
import React from "react"

export const onRenderBody = ({ setPostBodyComponents }: RenderBodyArgs) => {
  setPostBodyComponents([
    <script key="hypothesis-embed" src="https://hypothes.is/embed.js" async />,
  ])
}

export { wrapRootElement } from "./gatsby-browser"
