import React, { createContext, PropsWithChildren, useState } from "react"

export interface Annotation {
  id: string
  target: string
  content: any
  index: number
  position: number
  scrollIntoView?: () => void
}

interface Context {
  annotations: Array<Annotation>
  addAnnotation: (
    id: string,
    target: string,
    content: any,
    position: number,
    scrollIntoView?: () => void
  ) => void
}

export const AnnotationContext = createContext<Context>({
  annotations: [],
  addAnnotation: (_id, _t, _a) => {},
})

const AnnotationProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([])

  const addAnnotation = (
    id: string,
    target: string,
    content: any,
    position: number,
    scrollIntoView?: () => void
  ) => {
    setAnnotations(prev => {
      const index = prev.length + 1
      return [...prev, { id, target, content, index, position, scrollIntoView }]
    })
  }

  return (
    <AnnotationContext.Provider value={{ annotations, addAnnotation }}>
      {children}
    </AnnotationContext.Provider>
  )
}

export default AnnotationProvider
