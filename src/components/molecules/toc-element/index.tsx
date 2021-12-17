import { AnimatePresence, motion } from "framer-motion"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import ReactMarkdown from "react-markdown"
import { PublicationPage } from "src/hooks/usePublication"
import { mdxComponents } from "src/templates/chapter"
import { getChapterFromIndex, getSupportedFitContent } from "~util"
import Arrow from "../arrow"
import * as Styled from "./style"

interface Props {
  page: PublicationPage
  last?: boolean
}

const TocElement: React.FC<Props> = ({ page, last }) => {
  const { t } = useTranslation("common")
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
  const { locale } = useLocalization()

  const toggleSummary = () => setIsSummaryExpanded(prev => !prev)

  return (
    <Styled.TocContainer>
      <Styled.ArticleNumber>
        {getChapterFromIndex(page.index ?? 0)}
      </Styled.ArticleNumber>
      <Styled.ArticleTitle to={page.path} language={locale}>
        <ReactMarkdown components={mdxComponents as any}>
          {page.title}
        </ReactMarkdown>
      </Styled.ArticleTitle>
      <Styled.ArticleAuthor type="primary">{page.author}</Styled.ArticleAuthor>
      {page.summary && (
        <>
          <Styled.SummaryButton onClick={toggleSummary}>
            <span>{t("expand_summary")}</span>
            <Arrow inverted={isSummaryExpanded} />
          </Styled.SummaryButton>
          <AnimatePresence initial={false} exitBeforeEnter>
            {isSummaryExpanded && (
              <Styled.Summary
                as={motion.p}
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: getSupportedFitContent(),
                }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <ReactMarkdown components={mdxComponents as any}>
                  {page.summary}
                </ReactMarkdown>
              </Styled.Summary>
            )}
          </AnimatePresence>
        </>
      )}
      {!last && <Styled.Divider />}
    </Styled.TocContainer>
  )
}

export default TocElement
