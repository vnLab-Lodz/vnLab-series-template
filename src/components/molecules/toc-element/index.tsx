import { AnimatePresence, motion } from "framer-motion"
import { useLocalization } from "gatsby-theme-i18n"
import React, { PropsWithChildren, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactMarkdown from "react-markdown"
import { PublicationPage } from "src/hooks/usePublication"
import { mdxComponents } from "src/templates/chapter"
import { getChapterFromIndex, getSupportedFitContent } from "~util"
import Arrow from "../arrow"
import * as Styled from "./style"

type Props = PropsWithChildren<{
  page: PublicationPage
  last?: boolean
  current?: boolean
  hideDivider?: boolean
}>

const TocElement: React.FC<Props> = ({
  page,
  last,
  current,
  hideDivider,
  children,
}) => {
  const { t } = useTranslation("common")
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
  const { locale } = useLocalization()

  const getDividerVisibility = () => {
    if (hideDivider) return false

    return !last && !current
  }

  const toggleSummary = () => setIsSummaryExpanded(prev => !prev)

  const isDividerVisible = getDividerVisibility()

  const chapter = getChapterFromIndex(page.index ?? 0)

  return (
    <Styled.TocContainer $highlighted={current} data-highlighted={current}>
      {chapter !== "00" && (
        <Styled.ArticleNumber>{chapter}</Styled.ArticleNumber>
      )}
      {page.slideshow ? (
        <Styled.SlidshowTitle>{t("graphical")}</Styled.SlidshowTitle>
      ) : null}
      <Styled.ArticleTitle to={page.path} language={locale}>
        <ReactMarkdown components={mdxComponents as any}>
          {page.title}
        </ReactMarkdown>
      </Styled.ArticleTitle>
      {page.author && (
        <Styled.ArticleAuthor type="primary">
          {page.author}
        </Styled.ArticleAuthor>
      )}
      {page.summary && (
        <>
          <Styled.SummaryButton onClick={toggleSummary}>
            <span>{t("expand_summary")}</span>
            <Arrow inverted={isSummaryExpanded} />
          </Styled.SummaryButton>
          <AnimatePresence initial={false} exitBeforeEnter>
            {isSummaryExpanded && (
              <Styled.Summary
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: getSupportedFitContent(),
                }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <ReactMarkdown
                  components={{ ...mdxComponents, p: Styled.p } as any}
                >
                  {page.summary}
                </ReactMarkdown>
              </Styled.Summary>
            )}
          </AnimatePresence>
        </>
      )}
      {!!children ? <Styled.Children>{children}</Styled.Children> : null}
      {isDividerVisible && <Styled.Divider />}
    </Styled.TocContainer>
  )
}

export default TocElement
