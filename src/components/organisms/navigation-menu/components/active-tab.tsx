import React from "react"
import { NAV_MENU_STATES } from "../types"
import * as Styled from "../style"
import About from "../tabs/about"
import Indexes from "../tabs/indexes"

const ActiveTab: React.FC<{ navState: NAV_MENU_STATES }> = ({ navState }) => {
  switch (navState) {
    case NAV_MENU_STATES.TOC:
      return <Styled.TableOfContents headless />
    case NAV_MENU_STATES.INDEXES:
      return <Indexes />
    case NAV_MENU_STATES.ABOUT:
      return <About />
    default:
      return <></>
  }
}

export default ActiveTab
