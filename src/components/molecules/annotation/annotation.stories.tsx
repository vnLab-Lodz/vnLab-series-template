import React from "react"
import { Story, Meta } from "@storybook/react"
import Annotation from "."
import atoms from "~components/atoms"

export default {
  component: Annotation,
  title: "Molecules/Annotation",
} as Meta

export const Example: Story = () => {
  return (
    <atoms.p style={{ maxWidth: "800px" }}>
      We wczesnych, zwłaszcza fabularnych filmach Agnès Vardy śmierć jest dla
      bohaterek egzystencjalnym skandalem – przychodzi znikąd, jest{" "}
      <Annotation target="absurdalna">
        Po raz pierwszy Varda użyła tego określenia w odniesieniu do swojego
        wczesnego filmu eksperymentalnego L’Opéra-Mouffe (1958) i posługuje się
        nim konsekwentnie do dziś, doskonaląc stopniowo ten autorski gatunek z
        pogranicza dokumentu intymnego, filmowego dziennika i awangardowego
        kolażu. Por. Dominique Bluher, La miroitière. À propos de quelques films
        et installations d’Agnès Varda, w: Agnès Varda: le cinéma et au-delà,
        red. A. Fiant, R. Hamery, É. Thouvenel, Presses Universitaires de
        Rennes, Rennes 2009, s. 177; Alison Smith, Agnès Varda, Manchester
        University Press, Manchester–New York 2005, s. 94.
      </Annotation>
      , pozbawiona sensu i uzasadnienia w świecie, w którym piękno i miłość to
      synonimy życia.
    </atoms.p>
  )
}
