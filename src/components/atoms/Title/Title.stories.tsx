import React from "react"
import { Story, Meta } from "@storybook/react"
import atoms from "~components/atoms"

export default {
  component: atoms.title,
  title: "Atoms/Typography/Title",
} as Meta

const AtomStory: Story = args => <atoms.title {...args} />

export const Default = AtomStory.bind({})
Default.args = {
  children: "Example Title",
}

export const CrimsonPro = AtomStory.bind({})
CrimsonPro.args = {
  children: "Crimson Pro Title",
  type: "secondary",
}

export const HKGrotesk = AtomStory.bind({})
HKGrotesk.args = {
  children: "HK-Grotesk Title",
  type: "primary",
}
