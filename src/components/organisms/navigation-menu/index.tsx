import React, { useContext } from "react"
import { NavMenuContext } from "./nav-menu-context"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"

//@ts-ignore
import HamburgerSVG from "../../../images/icons/hamburger.svg"
//@ts-ignore
import VnlabLogo from "../../../images/icons/vnlab_logo.svg"

interface Props {}

const NavigationMenu: React.FC<Props> = () => {
  const { navMode } = useContext(NavMenuContext)
  const { t } = useTranslation("common")

  return (
    <Styled.Aside>
      <Styled.Nav mode={navMode}>
        <Styled.HamburgerBtn onClick={() => alert("Click")}>
          <img src={HamburgerSVG} alt="Hamburger Button" />
        </Styled.HamburgerBtn>
        <Styled.Title>{t("title")}</Styled.Title>
        <Styled.Logo src={VnlabLogo} alt="vnLab logo" />
      </Styled.Nav>
    </Styled.Aside>
  )
}

export default NavigationMenu
