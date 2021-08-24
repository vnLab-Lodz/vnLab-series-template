import styled from "styled-components"

export const IllustrationsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  row-gap: ${({ theme }) => theme.spacing.xxs};
  column-gap: ${({ theme }) => theme.spacing.xxs};
`
