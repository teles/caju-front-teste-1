import { Meta, StoryFn } from "@storybook/react";
import { LoadingDots } from "~/components/LoadingDots";

export default {
  title: "Componentes/LoadingDots",
  component: LoadingDots,
} as Meta;

const Template: StoryFn = (args) => <LoadingDots {...args} />;

export const Default = Template.bind({});
Default.args = {};
