import React from "react"
import atoms from "~components/atoms"
import Layout from "../layout"

//@ts-ignore
import ArrowDown from "src/images/icons/arrow_down.svg"
import styled from "styled-components"
import { motion } from "framer-motion"
import * as Styled from "./style"

const VSpan = styled(motion.span)`
  font-family: ${({ theme: { typography } }) => typography.fonts.primary};
  font-size: 13px;
  display: inline-block;
  font-weight: bold;
`

const Arrow = () => {
  return <VSpan initial={{ rotate: 90 }}>{">"}</VSpan>
}

const ArticleMenu = () => {
  return (
    <Styled.ArticleNav>
      <Styled.Button>
        <Styled.ButtonText>Treść</Styled.ButtonText> <Arrow />
      </Styled.Button>
      <Styled.Button>
        <Styled.ButtonText>Ilustracje</Styled.ButtonText> <Arrow />
      </Styled.Button>
      <Styled.Button>
        <Styled.ButtonText>Przypisy</Styled.ButtonText> <Arrow />
      </Styled.Button>
      <Styled.Button>
        <Styled.ButtonText>Bibliografia</Styled.ButtonText> <Arrow />
      </Styled.Button>
    </Styled.ArticleNav>
  )
}

export default ArticleMenu
