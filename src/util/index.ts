export * from "./locale"
export * from "./slug"
export * from "./getCurrentPageIndex"
export * from "./indexes"
export * from "./getSupportedFitContent"
export * from "./isFirefox"

export const isUndefined = (o: any): o is undefined => typeof o === "undefined"
