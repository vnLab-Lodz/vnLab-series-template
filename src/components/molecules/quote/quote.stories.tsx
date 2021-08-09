import React from "react"
import { Story, Meta } from "@storybook/react"
import Quote from "."

export default {
  component: Quote,
  title: "Molecules/Quote",
} as Meta

const MoleculeStory: Story = args => <Quote {...args} />

export const Secondary = MoleculeStory.bind({})
Secondary.args = {
  style: { maxWidth: "800px" },
  type: "secondary",
  children: `Umieranie nie jest tutaj zatem problemem, co najwyżej pozbawia problemu
    tych, którzy pozostali przy życiu. Nie dowiadujemy się, co kierowało
    bohaterką, a jej walka o życie zredukowana zostaje do mikroujęć
    pokazujących ją, jak tonąc, chwyta się zwieszających się nad wodą
    gałęzi.`,
  author: "Agnès Vardy",
}
