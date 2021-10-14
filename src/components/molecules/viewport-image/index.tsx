import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  CSSProperties,
} from "react"
import { ImagesContext } from "src/context/illustrations-context"
import ReactDOM from "react-dom"
import { getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import * as Styled from "./style"

//@ts-ignore
import XSVG from "../../../images/icons/x.svg"

interface Props {
  image: IGatsbyImageData
  caption: string
}

interface PortalProps {
  toggle: () => void
  position: number
  caption: string
}

const CaptionPortal: React.FC<PortalProps> = ({
  children,
  position,
  toggle,
  caption,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  return ReactDOM.createPortal(
    <Styled.CaptionContent
      ref={ref}
      as="article"
      style={{ bottom: `${position}px` }}
    >
      <Styled.CaptionHeader>{caption}</Styled.CaptionHeader>
      <Styled.CloseBtn onClick={toggle}>
        <img src={XSVG} alt="Close" />
      </Styled.CloseBtn>
      <Styled.CaptionParagraph>{children}</Styled.CaptionParagraph>
    </Styled.CaptionContent>,
    document.body
  )
}

const ViewportImage: React.FC<Props> = ({ image, children, caption }) => {
  const [open, setOpen] = useState<boolean>(false)
  const { addImage } = useContext(ImagesContext)
  const [position, setPosition] = useState<number | undefined>(undefined)
  const ref = useRef<HTMLDivElement | null>(null)
  const [wrapperOffset, setWrapperOffset] = useState(0)
  const { t } = useTranslation("common")
  const [inViewRef, isInView] = useInView({ threshold: 0.97 })

  const calculatePosition = () => {
    if (!ref || !ref.current) return

    const { offsetTop, offsetHeight } = ref.current
    const offset = offsetTop + offsetHeight
    const doc = document.documentElement

    setPosition(doc.clientHeight - offset)
  }

  const calculateScrollPosition = () => {
    if (!ref || !ref.current) return 0

    return ref.current.offsetTop - 130
  }

  const calculateWrapperOffset = () => {
    if (!ref || !ref.current) return

    const { offsetLeft } = ref.current
    setWrapperOffset(-offsetLeft)
  }

  const handleClick = () => {
    calculatePosition()
    setOpen(true)
  }

  useEffect(() => {
    calculatePosition()
    addImage(image, calculateScrollPosition())
    inViewRef(ref.current)
    calculateWrapperOffset()
    window.addEventListener("resize", calculateWrapperOffset)

    return () => {
      window.removeEventListener("resize", calculateWrapperOffset)
    }
  }, [ref])

  const getFixedPositions = () => {
    if (!ref || !ref.current) return { left: 0, right: 0 }

    const { offsetLeft, offsetWidth } = ref.current

    const left = offsetLeft
    const right = document.body.clientWidth - offsetLeft - offsetWidth

    return { left, right }
  }

  const getStickyStyle = (): CSSProperties =>
    isInView
      ? { position: "fixed", ...getFixedPositions() }
      : { position: "absolute", left: "0px", right: "0px" }

  const img = getImage(image) as IGatsbyImageData

  const aspectRatio = `${img.width}/${img.height}`

  return (
    <Styled.ViewportConstraint as={motion.div} ref={ref}>
      <Styled.Absolute style={getStickyStyle()}>
        <Styled.ImageWrapper
          style={{ transform: `translateX(${wrapperOffset}px)` }}
        >
          <Styled.Image image={img} alt="" style={{ aspectRatio }} />
        </Styled.ImageWrapper>
        <Styled.Caption>
          <Styled.CaptionText>{caption}</Styled.CaptionText>
          <Styled.ExpandCaptionBtn onClick={handleClick}>
            {t("expand")}
          </Styled.ExpandCaptionBtn>
        </Styled.Caption>
        {open && position && (
          <CaptionPortal
            caption={caption}
            toggle={() => setOpen(false)}
            position={position}
          >
            {children}
          </CaptionPortal>
        )}
      </Styled.Absolute>
    </Styled.ViewportConstraint>
  )
}

export default ViewportImage
