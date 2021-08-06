import React from "react"
import { Story, Meta } from "@storybook/react"
import * as atoms from ".."

export default {
  component: atoms.ol,
  title: "Atoms/Lists/Ordered List",
} as Meta

const AtomStory: Story = args => <atoms.ol {...args} />

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
      <atoms.ol>
        <li>Nested element</li>
        <atoms.ol>
          <li>More deeply nested element</li>
        </atoms.ol>
      </atoms.ol>
    </>
  ),
}
