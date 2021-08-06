import React from "react"
import { Story, Meta } from "@storybook/react"
import { H2 } from "./Header2"

export default {
  component: H2,
  title: "Atoms/Header 2",
} as Meta

const Header1Story: Story = args => <H2 {...args} />

export const Default = Header1Story.bind({})
Default.args = {
  children: "Example Header 2",
}

export const CrimsonPro = Header1Story.bind({})
CrimsonPro.args = {
  children: "Crimson Pro Header 2",
  type: "secondary",
}

export const HKGrotesk = Header1Story.bind({})
HKGrotesk.args = {
  children: "HK-Grotesk Header 2",
  type: "primary",
}
