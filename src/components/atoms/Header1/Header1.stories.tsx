import React from "react"
import { Story, Meta } from "@storybook/react"
import { H1 } from "./Header1"

export default {
  component: H1,
  title: "Atoms/Typography/Header 1",
} as Meta

const H1Story: Story = args => <H1 {...args} />

export const Default = H1Story.bind({})
Default.args = {
  children: "Example Header",
}

export const CrimsonPro = H1Story.bind({})
CrimsonPro.args = {
  children: "Crimson Pro Header",
  type: "secondary",
}

export const HKGrotesk = H1Story.bind({})
HKGrotesk.args = {
  children: "HK-Grotesk Header",
  type: "primary",
}
