import React from "react"
import { Story, Meta } from "@storybook/react"
import { H1 } from "./Header1"

export default {
  component: H1,
  title: "Atoms/Header 1",
} as Meta

const Header1Story: Story = args => <H1 {...args} />

export const Default = Header1Story.bind({})
Default.args = {
  children: "Example Header",
}

export const CrimsonPro = Header1Story.bind({})
CrimsonPro.args = {
  children: "Crimson Pro Header",
  type: "secondary",
}

export const HKGrotesk = Header1Story.bind({})
HKGrotesk.args = {
  children: "HK-Grotesk Header",
  type: "primary",
}
