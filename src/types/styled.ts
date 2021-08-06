export type Styledtypes = "primary" | "secondary"

export interface StyledTypeProps {
  type?: Styledtypes
}

export const isPrimary = (type: Styledtypes): type is "primary" =>
  type === "primary"
export const isSecondary = (type: Styledtypes): type is "secondary" =>
  type === "secondary"
