import React, { createContext, useState } from "react"

interface Annotation {
  target: string
  content: string
  index: number
}

interface Context {
  annotations: Array<Annotation>
  addAnnotation: (target: string, content: string) => void
}

export const AnnotationContext = createContext<Context>({
  annotations: [],
  addAnnotation: (_t, _a) => {},
})

const AnnotationProvider: React.FC = ({ children }) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([])

  const addAnnotation = (target: string, content: string) => {
    setAnnotations(prev => {
      const index = prev.length + 1
      return [...prev, { target, content, index }]
    })
  }

  return (
    <AnnotationContext.Provider value={{ annotations, addAnnotation }}>
      {children}
    </AnnotationContext.Provider>
  )
}

export default AnnotationProvider
