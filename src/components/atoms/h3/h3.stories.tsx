import React from "react"
import { Story, Meta } from "@storybook/react"
import atoms from "~components/atoms"

export default {
  component: atoms.h3,
  title: "Atoms/Typography/Header 3",
} as Meta

const H3Story: Story = args => <atoms.h3 {...args} />

export const Default = H3Story.bind({})
Default.args = {
  children: "Example Header 3",
}

export const CrimsonPro = H3Story.bind({})
CrimsonPro.args = {
  children: "Crimson Pro Header 3",
  type: "secondary",
}

export const HKGrotesk = H3Story.bind({})
HKGrotesk.args = {
  children: "HK-Grotesk Header 3",
  type: "primary",
}
