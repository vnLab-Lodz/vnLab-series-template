import * as React from "react"
import { Link } from "gatsby"
import "./Header.scss"
import { StaticImage } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"

interface Props {
  siteTitle: string
}

const Header: React.FC<Props> = ({ siteTitle }) => {
  const { t } = useTranslation("common")

  return (
    <header className="header">
      <div className="header__container">
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
        <h1 className="header__title">{t("title", siteTitle)}</h1>
      </div>
    </header>
  )
}

export default Header
