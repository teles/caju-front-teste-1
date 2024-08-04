import { Meta, StoryFn } from "@storybook/react";

import { EmptyStateRegistrationCard } from "~/pages/Dashboard/components/RegistrationCard";
import { RegistrationStatus } from "~/types/registration";

export default {
  title: "Componentes/Dashboard/EmptyStateRegistrationCard",
  component: EmptyStateRegistrationCard,
  argTypes: {
    status: {
      control: {
        type: "select",
        options: [
          RegistrationStatus.APPROVED,
          RegistrationStatus.REVIEW,
          RegistrationStatus.REPROVED,
        ],
      },
    },
  },
} as Meta;

const Template: StoryFn<typeof EmptyStateRegistrationCard> = (args) => (
  <EmptyStateRegistrationCard {...args} />
);

export const Approved = Template.bind({});
Approved.args = {
  status: RegistrationStatus.APPROVED,
};

export const Review = Template.bind({});
Review.args = {
  status: RegistrationStatus.REVIEW,
};

export const Reproved = Template.bind({});
Reproved.args = {
  status: RegistrationStatus.REPROVED,
};
