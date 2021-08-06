import React from "react"
import { Story, Meta } from "@storybook/react"
import { H2 } from "./Header2"

export default {
  component: H2,
  title: "Atoms/Typography/Header 2",
} as Meta

const H2Story: Story = args => <H2 {...args} />

export const Default = H2Story.bind({})
Default.args = {
  children: "Example Header 2",
}

export const CrimsonPro = H2Story.bind({})
CrimsonPro.args = {
  children: "Crimson Pro Header 2",
  type: "secondary",
}

export const HKGrotesk = H2Story.bind({})
HKGrotesk.args = {
  children: "HK-Grotesk Header 2",
  type: "primary",
}
