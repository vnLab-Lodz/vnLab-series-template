import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"

interface Props {
  siteTitle: string
}

const Header: React.FC<Props> = ({ siteTitle }) => {
  const { t } = useTranslation("common")

  return (
    <Styled.Header>
      <Styled.Container className="header__container">
        <Link to="/" className="header__link">
          <StaticImage
            src="../../images/vnLab-icon.png"
            height={32}
            quality={100}
            formats={["auto", "webp", "avif"]}
            alt="A Gatsby astronaut"
            style={{ marginRight: "1.5rem" }}
          />
        </Link>
        <Styled.Title className="header__title">
          {t("title", siteTitle)}
        </Styled.Title>
      </Styled.Container>
    </Styled.Header>
  )
}

export default Header
