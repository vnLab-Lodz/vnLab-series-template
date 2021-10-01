import { motion } from "framer-motion"
import styled from "styled-components"
import typography from "~styles/typography"

const ArrowSpan = styled(motion.span)`
  font-family: ${({ theme: { typography } }) => typography.fonts.primary};
  font-size: ${typography.sm};
  display: inline-block;
  font-weight: bold;
`

export { ArrowSpan }
