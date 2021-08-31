import { AnimatePresence, motion } from "framer-motion"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { PublicationPage } from "src/hooks/usePublication"
import { getChapterFromIndex } from "~util"
import Arrow from "../arrow"
import * as Styled from "./style"

interface Props {
  page: PublicationPage
}

const TocElement: React.FC<Props> = ({ page }) => {
  const { t } = useTranslation("common")
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
  const { locale } = useLocalization()

  const toggleSummary = () => setIsSummaryExpanded(prev => !prev)

  return (
    <Styled.TocContainer>
      <Styled.ArticleNumber>
        {getChapterFromIndex(page.index ?? 0)}
      </Styled.ArticleNumber>
      <Styled.ArticlTitle to={page.path}>
        <Styled.TitleLink to={page.path} language={locale}>
          {page.title}
        </Styled.TitleLink>
      </Styled.ArticlTitle>
      <Styled.ArticleAuthor type="primary">{page.author}</Styled.ArticleAuthor>
      <Styled.SummaryButton onClick={toggleSummary}>
        <span>{t("expand_summary")}</span>
        <Arrow inverted={isSummaryExpanded} />
      </Styled.SummaryButton>
      <AnimatePresence initial={false} exitBeforeEnter>
        {isSummaryExpanded && (
          <Styled.Summary
            as={motion.p}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "fit-content" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {page.summary}
          </Styled.Summary>
        )}
      </AnimatePresence>
      <Styled.Divider />
    </Styled.TocContainer>
  )
}

export default TocElement
