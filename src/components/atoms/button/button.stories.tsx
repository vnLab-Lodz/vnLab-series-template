import React from "react"
import { Story, Meta } from "@storybook/react"
import atoms from "~components/atoms"

export default {
  component: atoms.h1,
  title: "Atoms/Interactibles/Button",
} as Meta

const AtomStory: Story = args => <atoms.button {...args} />

export const Default = AtomStory.bind({})
Default.args = {
  children: "Example Button",
}
