import React, { useContext, useState } from "react"
import { NavMenuContext } from "./nav-menu-context"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"
import {
  useMotionTemplate,
  useTransform,
  useViewportScroll,
} from "framer-motion"

//@ts-ignore
import HamburgerSVG from "../../../images/icons/hamburger.svg"
//@ts-ignore
import CloseSVG from "../../../images/icons/x.svg"
//@ts-ignore
import VnlabLogo from "../../../images/icons/vnlab_logo.svg"

const NavigationMenu: React.FC = () => {
  const { navMode } = useContext(NavMenuContext)
  const [open, setOpen] = useState(false)
  const { t } = useTranslation("common")

  const { scrollYProgress } = useViewportScroll()
  const scrollPercent = useTransform(scrollYProgress, [0, 1], [0, 100])
  const progress = useMotionTemplate`${scrollPercent}%`

  const toggleMenu = () => setOpen(prev => !prev)

  return (
    <Styled.Aside>
      <Styled.Nav mode={navMode}>
        <Styled.Progress style={{ height: progress, width: progress }} />
        <Styled.ToggleBtn open={open} onClick={toggleMenu}>
          <img src={open ? CloseSVG : HamburgerSVG} alt="Toggle Menu Button" />
        </Styled.ToggleBtn>
        <Styled.Title>{t("title")}</Styled.Title>
        <Styled.Logo src={VnlabLogo} alt="vnLab logo" />
      </Styled.Nav>
    </Styled.Aside>
  )
}

export default NavigationMenu
