import { useLayoutEffect, useState } from "react"

export default function useIsMobile(
  callback?: (mobile: boolean) => void
): boolean {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    if (callback) callback(mobile)
  }

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}
