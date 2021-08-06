import { DefaultTheme, StyledComponentProps } from "styled-components"

export * from "./config"
export * from "./styled"

export type ElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never

export type ExtendStyledProps<
  C extends string | React.ComponentType<any>,
  P extends object = {},
  A extends keyof any = never,
  T extends object = DefaultTheme
> = StyledComponentProps<C, T, P, A> & {
  as?: string | React.ComponentType<any>
  forwardedAs?: string | React.ComponentType<any>
}
