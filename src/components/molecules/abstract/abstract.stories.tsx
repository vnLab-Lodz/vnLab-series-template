import React from "react"
import { Story, Meta } from "@storybook/react"
import Abstract from "."

export default {
  component: Abstract,
  title: "Molecules/Abstract",
} as Meta

const MoleculeStory: Story = args => <Abstract {...args} />

export const Default = MoleculeStory.bind({})
Default.args = {
  style: { maxWidth: "800px" },
  children: `We wczesnych, zwłaszcza fabularnych filmach Agnès Vardy śmierć jest dla
    bohaterek egzystencjalnym skandalem – przychodzi znikąd, jest absurdalna,
    pozbawiona sensu i uzasadnienia w świecie, w którym piękno i miłość to
    synonimy życia.`,
}
