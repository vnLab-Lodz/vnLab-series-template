import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import atoms from "~components/atoms"
import Arrow from "../arrow"
import * as Styled from "./style"

interface Props {
  variant: "left" | "right"
  header: string
  title: string
  author: string
  summary: string
  number: number
}

const FooterElement: React.FC<Props> = ({
  variant,
  header,
  author,
  summary,
  number,
  title,
}) => {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
  const { t } = useTranslation("common")

  const toggleSummary = () => setIsSummaryExpanded(prev => !prev)

  const getFormattedNumber = () => (number >= 10 ? number : `0${number}`)

  return (
    <Styled.ElementWrapper variant={variant}>
      <Styled.VariantHeader type="primary">{header}:</Styled.VariantHeader>
      <Styled.ArticleNumber>{getFormattedNumber()}</Styled.ArticleNumber>
      <atoms.p>{title}</atoms.p>
      <Styled.ArticleAuthor type="primary">{author}</Styled.ArticleAuthor>
      <Styled.SummaryButton onClick={toggleSummary}>
        <span>{t("expand_summary")}</span>
        <Arrow inverted={isSummaryExpanded} />
      </Styled.SummaryButton>
      <AnimatePresence exitBeforeEnter>
        {isSummaryExpanded && (
          <atoms.p
            as={motion.p}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "fit-content" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {summary}
          </atoms.p>
        )}
      </AnimatePresence>
    </Styled.ElementWrapper>
  )
}

export default FooterElement
