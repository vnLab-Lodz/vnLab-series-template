import styled from "styled-components"

export const a = styled.a.attrs({
  target: "_blank",
  onClick: (e: any) => e.stopPropagation(),
})`
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  line-height: inherit;
  cursor: pointer;
  text-decoration: underline;
  color: inherit;
`
