import { useLayoutEffect, useState } from "react"

export default function useIsMobile(callback?: () => void): boolean {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768)
    if (callback) callback()
  }

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}
