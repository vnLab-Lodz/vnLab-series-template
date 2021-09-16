import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import atoms from "~components/atoms"
import { getSupportedFitContent } from "~util"
import { getChapterFromIndex } from "~util/indexes"
import Arrow from "../arrow"
import * as Styled from "./style"

interface Props {
  variant: "left" | "right"
  id: string
  header: string
  title: string
  author?: string
  summary?: string
  number?: number
  path: string
}

const FooterElement: React.FC<Props> = ({
  variant,
  header,
  author,
  summary,
  number,
  title,
  path,
  id,
}) => {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
  const { t } = useTranslation("common")

  const toggleSummary = () => setIsSummaryExpanded(prev => !prev)

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <Styled.ElementWrapper
        key={id}
        as={motion.article}
        variant={variant}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Styled.VariantHeader type="primary">{header}:</Styled.VariantHeader>
        <Styled.ArticleNumber>
          {getChapterFromIndex(number ?? 0)}
        </Styled.ArticleNumber>
        <Styled.ArticlTitle to={path}>
          <atoms.p>{title}</atoms.p>
        </Styled.ArticlTitle>
        <Styled.ArticleAuthor type="primary">{author}</Styled.ArticleAuthor>
        <Styled.SummaryButton onClick={toggleSummary}>
          <span>{t("expand_summary")}</span>
          <Arrow inverted={isSummaryExpanded} />
        </Styled.SummaryButton>
        <AnimatePresence initial={false} exitBeforeEnter>
          {isSummaryExpanded && (
            <atoms.p
              as={motion.p}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: getSupportedFitContent() }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {summary}
            </atoms.p>
          )}
        </AnimatePresence>
      </Styled.ElementWrapper>
    </AnimatePresence>
  )
}

export default FooterElement
