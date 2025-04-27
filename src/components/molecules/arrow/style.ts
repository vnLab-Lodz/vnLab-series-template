import { motion } from "framer-motion"
import styled from "styled-components"
import typography from "~styles/typography"

const ArrowSpan = styled(motion.span)`
  font-family: ${({ theme: { typography } }) => typography.fonts.primary};
  font-size: calc(${typography.sm} * 0.8);
  display: inline-block;
  font-weight: bold;
`

export { ArrowSpan }
