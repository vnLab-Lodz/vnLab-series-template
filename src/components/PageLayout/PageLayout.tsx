import * as React from "react"
import Header from "../Header"
import { graphql, useStaticQuery } from "gatsby"
import { SiteMetadata } from "../../types/config"
import "./globals.css"
import "./PageLayout.scss"

interface Query {
  site: {
    siteMetadata: Pick<SiteMetadata, "title">
  }
}

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const PageLayout: React.FC = ({ children }) => {
  const { site } = useStaticQuery<Query>(query)
  const title = site.siteMetadata.title || "Title"
  const date = new Date().getFullYear()

  return (
    <>
      <Header siteTitle={title} />
      <div className="layout">
        <main>{children}</main>
        <footer className="layout__footer">
          © {date}, Built with
          {` `}
          <a
            href="https://www.gatsbyjs.com"
            target="_blank"
            style={{ color: "#00b140" }}
          >
            Gatsby
          </a>
        </footer>
      </div>
    </>
  )
}

export default PageLayout
