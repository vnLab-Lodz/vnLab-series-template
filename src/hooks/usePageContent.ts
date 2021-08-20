import { useState, useEffect } from "react"

export interface Contents {
  text: string
  level: "h1" | "h2" | "h3"
  y: number
}

export default function (): Contents[] {
  const [contents, setContents] = useState<Contents[]>([])

  const getContents = () => {
    const mdx = document.querySelector(".mdx-section")
    const elements: NodeListOf<HTMLElement> | undefined = mdx?.querySelectorAll(
      "h1.mdx-heading, h2.mdx-heading, h3.mdx-heading"
    )

    if (typeof elements !== "undefined")
      setContents(
        Array.from(elements).map(
          e =>
            ({
              text: e.textContent,
              level: e.localName,
              y: e.offsetTop,
            } as Contents)
        )
      )
  }

  useEffect(() => {
    getContents()
    window.addEventListener("resize", getContents)

    return () => {
      window.removeEventListener("resize", getContents)
    }
  }, [])

  return contents
}
