import React from "react"
import { Story, Meta } from "@storybook/react"
import atoms from "~components/atoms"

export default {
  component: atoms.h1,
  title: "Atoms/Typography/Header 1",
} as Meta

const AtomStory: Story = args => <atoms.h1 {...args} />

export const Default = AtomStory.bind({})
Default.args = {
  children: "Example Header",
}

export const CrimsonPro = AtomStory.bind({})
CrimsonPro.args = {
  children: "Crimson Pro Header",
  type: "secondary",
}

export const HKGrotesk = AtomStory.bind({})
HKGrotesk.args = {
  children: "HK-Grotesk Header",
  type: "primary",
}
