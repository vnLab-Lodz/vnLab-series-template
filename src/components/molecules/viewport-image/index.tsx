import React, { useState, useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import { getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"
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
  const [position, setPosition] = useState<number | undefined>(undefined)
  const ref = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation("common")

  const calculatePosition = () => {
    if (!ref || !ref.current) return

    const { offsetTop, offsetHeight } = ref.current
    const offset = offsetTop + offsetHeight
    const doc = document.documentElement

    setPosition(doc.clientHeight - offset)
  }

  const handleClick = () => {
    calculatePosition()
    setOpen(true)
  }

  useEffect(() => {
    calculatePosition()
  }, [ref])

  return (
    <Styled.ViewportConstraint ref={ref}>
      <Styled.Absolute>
        <Styled.ImageWrapper>
          <Styled.Image image={getImage(image) as IGatsbyImageData} alt="" />
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
