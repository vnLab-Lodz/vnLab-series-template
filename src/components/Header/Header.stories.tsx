import React from "react"
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react"
import Header from "./Header"
import { Globals } from "../../styles/globals"
import { ThemeProvider } from "styled-components"
import theme from "../../styles/theme"

export default {
  title: "Gatsby Header",
  component: Header,
  argTypes: {
    siteTitle: { defaultValue: "Title" },
  },
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = args => <Header {...args} />

export const Primary = Template.bind({})
Primary.args = {
  siteTitle: "Storybook Example",
}

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <Globals />
    {story()}
  </ThemeProvider>
))
