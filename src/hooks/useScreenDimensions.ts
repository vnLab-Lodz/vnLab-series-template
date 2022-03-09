import { useLayoutEffect, useState } from "react"

export default function useScreenDimensions() {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handleResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return { width, height }
}
