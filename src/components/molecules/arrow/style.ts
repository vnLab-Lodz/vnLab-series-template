import { motion } from "framer-motion"
import styled from "styled-components"

const ArrowSpan = styled(motion.span)`
  font-family: ${({ theme: { typography } }) => typography.fonts.primary};
  font-size: 13px;
  display: inline-block;
  font-weight: bold;
`

export { ArrowSpan }
