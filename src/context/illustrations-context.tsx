import { IGatsbyImageData } from "gatsby-plugin-image"
import React, { createContext, useState } from "react"

export interface Image {
  imageData: IGatsbyImageData
  position: number
}

interface Context {
  images: Image[]
  addImage: (image: IGatsbyImageData, position: number) => void
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

  const addImage = (image: IGatsbyImageData, position: number) => {
    setImages(prev => [...prev, { imageData: image, position }])
  }

  return (
    <ImagesContext.Provider value={{ images, addImage }}>
      {children}
    </ImagesContext.Provider>
  )
}

export default ImagesProvider
