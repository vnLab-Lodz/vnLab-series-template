import React from "react"
import { Story, Meta } from "@storybook/react"
import { Paragraph } from "./Paragraph"

export default {
  component: Paragraph,
  title: "Atoms/Typography/Paragraph",
} as Meta

const ParagraphStory: Story = args => <Paragraph {...args} />

export const Default = ParagraphStory.bind({})
Default.args = {
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
}
