import styled from "styled-components"

export const IllustrationsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  row-gap: ${({ theme }) => theme.spacing.xxs};
  column-gap: ${({ theme }) => theme.spacing.xxs};
`

export const IllustrationButton = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  aspect-ratio: 1;
  cursor: pointer;
`
