import React from "react"
import { Story, Meta } from "@storybook/react"
import atoms from ".."

export default {
  component: atoms.ul,
  title: "Atoms/Lists/Unordered List",
} as Meta

const AtomStory: Story = args => <atoms.ul {...args} />

export const Default = AtomStory.bind({})
Default.args = {
  children: (
    <>
      <li>Element 1</li>
      <li>Element 2</li>
    </>
  ),
}

export const Multilevel = AtomStory.bind({})
Multilevel.args = {
  children: (
    <>
      <li>Element 1</li>
      <li>Element 2</li>
      <atoms.ul>
        <li>Nested element</li>
        <li>Nested element</li>
        <atoms.ul>
          <li>More deeply nested element</li>
          <li>More deeply nested element</li>
          <li>More deeply nested element</li>
        </atoms.ul>
      </atoms.ul>
    </>
  ),
}
