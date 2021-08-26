import React, { useContext } from "react"
import * as Styled from "./style"
import { graphql, useStaticQuery } from "gatsby"

//@ts-ignore
import HamburgerSVG from "../../../images/icons/hamburger.svg"
//@ts-ignore
import VnlabLogo from "../../../images/icons/vnlab_logo.svg"
import { NavMenuContext } from "./nav-menu-context"

interface Props {}

// const query = graphql``

const NavigationMenu: React.FC<Props> = () => {
  // const data = useStaticQuery()
  const { navMode } = useContext(NavMenuContext)

  return (
    <Styled.Aside>
      <Styled.Nav mode={navMode}>
        <Styled.HamburgerBtn onClick={() => alert("Click")}>
          <img src={HamburgerSVG} alt="Hamburger Button" />
        </Styled.HamburgerBtn>
        <Styled.Title>Nowe narracje wizualne</Styled.Title>
        <img src={VnlabLogo} alt="vnLab logo" />
      </Styled.Nav>
    </Styled.Aside>
  )
}

export default NavigationMenu
