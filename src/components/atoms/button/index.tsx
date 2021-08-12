import React from "react"
import { ForwardRefComponent, HTMLMotionProps, motion } from "framer-motion"
import styled, { css, ThemeContext } from "styled-components"
import { useContext } from "react"
import { ExtendStyledProps } from "~types"

const StyledButton = styled(motion.button)`
  ${({ theme: { typography, spacing } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: 600;
    text-transform: uppercase;
    line-height: 115%;
    padding: ${spacing.xxs};
    background: transparent;
    border-style: solid;
    border-width: 2px;
    cursor: pointer;
  `}
`

type Props = ExtendStyledProps<
  ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">>
>

export const button: React.FC<Props> = props => {
  const { palette } = useContext(ThemeContext)

  return (
    <StyledButton
      style={{
        background: `${palette.transparentBlack}`,
        borderColor: palette.black,
        color: palette.black,
      }}
      whileHover={{
        background: palette.black,
        borderColor: palette.black,
        color: palette.white,
      }}
      whileTap={{
        background: palette.dark,
        borderColor: palette.dark,
      }}
      {...props}
    />
  )
}
