import React from "react"
import { Story, Meta } from "@storybook/react"
import { Title } from "./Title"

export default {
  component: Title,
  title: "Atoms/Title",
} as Meta

const TitleStory: Story = args => <Title {...args} />

export const Default = TitleStory.bind({})
Default.args = {
  children: "Example Title",
}

export const CrimsonPro = TitleStory.bind({})
CrimsonPro.args = {
  children: "Example Title in Crimson Pro",
  type: "secondary",
}

export const HKGrotesk = TitleStory.bind({})
HKGrotesk.args = {
  children: "Example Title in HK-Grotesk",
  type: "primary",
}
