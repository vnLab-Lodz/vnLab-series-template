import React from "react"
import { useTranslation } from "react-i18next"
import ReactMarkdown from "react-markdown"
import { components as mdx } from "~components/mdx"
import Slide from "../slide"
import * as Styled from "./style"

import ArrowDownSVG from "src/images/icons/arrow_down.svg"

type Props = { title?: string; subtitle?: string }

const p = React.Fragment
const components = { p, em: mdx.em, del: mdx.em, strong: mdx.strong } as any

const TitleSlide: React.FC<Props> = ({ title, subtitle }) => {
  const { t } = useTranslation("common")

  const renderMarkdown = (markdown?: string) => {
    if (!markdown) return null
    return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
  }

  const scroll = () => window.scrollBy({ top: 50 })

  return (
    <Slide>
      <Styled.TextContainer>
        <Styled.Label>{t("graphical")}</Styled.Label>
        <Styled.Title>{renderMarkdown(title)}</Styled.Title>
        <Styled.Subtitle>{renderMarkdown(subtitle)}</Styled.Subtitle>
        <Styled.ScrollButton onClick={scroll}>
          <img src={ArrowDownSVG} alt="Arrow down" />
        </Styled.ScrollButton>
      </Styled.TextContainer>
    </Slide>
  )
}

export default TitleSlide
