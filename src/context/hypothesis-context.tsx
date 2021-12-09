import React, { createContext, useEffect, useState } from "react"

interface Context {
  hypothesis: Element | null
  setHypothesis: React.Dispatch<React.SetStateAction<Element | null>>
}

export const HypothesisContext = createContext<Context | undefined>(undefined)

const HypothesisContextProvider: React.FC = ({ children }) => {
  const [hypothesis, setHypothesis] = useState<Element | null>(null)

  useEffect(() => {
    if (hypothesis !== null) return

    const interval = setInterval(() => {
      if (hypothesis !== null) return hypothesis

      const el = document.querySelector("hypothesis-sidebar")
      setHypothesis(el)

      // Style the shadow dom
      if (el !== null) {
        const style = document.createElement("style")

        style.innerHTML = `
        .Buckets__list.Buckets__list {
          background: transparent;
        }`

        if (el.shadowRoot) el.shadowRoot.appendChild(style)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [hypothesis])

  return (
    <HypothesisContext.Provider value={{ hypothesis, setHypothesis }}>
      {children}
    </HypothesisContext.Provider>
  )
}

export default HypothesisContextProvider
