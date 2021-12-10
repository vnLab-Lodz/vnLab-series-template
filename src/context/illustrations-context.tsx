import { IGatsbyImageData } from "gatsby-plugin-image"
import React, { createContext, useState } from "react"

export interface Image {
  imageData: IGatsbyImageData
  calculatePosition: () => number
  scrollIntoView?: () => void
}

interface Context {
  images: Image[]
  addImage: (
    image: IGatsbyImageData,
    calculatePosition: () => number,
    scrollIntoView?: () => void
  ) => void
}

interface Props {
  initialImages?: Image[]
}

export const ImagesContext = createContext<Context>({
  images: [],
  addImage: (_image, _position) => {},
})

const ImagesProvider: React.FC<Props> = ({ children, initialImages = [] }) => {
  const [images, setImages] = useState<Image[]>(initialImages)

  const addImage = (
    image: IGatsbyImageData,
    calculatePosition: () => number,
    scrollIntoView?: () => void
  ) => {
    setImages(prev => [
      ...prev,
      { imageData: image, calculatePosition, scrollIntoView },
    ])
  }

  return (
    <ImagesContext.Provider value={{ images, addImage }}>
      {children}
    </ImagesContext.Provider>
  )
}

export default ImagesProvider
