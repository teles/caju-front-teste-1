import { StoryFn, Meta } from "@storybook/react";
import { useState } from "react";

import ConfirmationModal, { ConfirmationModalProps } from "./index";

export default {
  title: "Componentes/ConfirmationModal",
  component: ConfirmationModal,
  argTypes: {
    isOpen: { control: "boolean" },
    title: { control: "text" },
    text: { control: "text" },
    confirmText: { control: "text" },
    cancelText: { control: "text" },
    onConfirm: { action: "confirmado" },
    onRequestClose: { action: "fechado" },
  },
} as Meta<ConfirmationModalProps>;

const Template: StoryFn<ConfirmationModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const handleRequestClose = () => {
    args.onRequestClose();
    setIsOpen(false);
  };

  const handleConfirm = () => {
    args.onConfirm();
    setIsOpen(false);
  };

  return (
    <ConfirmationModal
      {...args}
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      onConfirm={handleConfirm}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: "Confirmar Ação",
  text: "Você tem certeza de que deseja prosseguir?",
  confirmText: "Confirmar",
  cancelText: "Cancelar",
};

export const CustomText = Template.bind({});
CustomText.args = {
  isOpen: true,
  title: "Excluir Item",
  text: "Você realmente deseja excluir este item?",
  confirmText: "Sim, excluir",
  cancelText: "Não, manter",
};

export const WithCloseAlert = Template.bind({});
WithCloseAlert.args = {
  isOpen: true,
  title: "Confirmar Ação",
  text: "Você tem certeza de que deseja prosseguir?",
  confirmText: "Confirmar",
  cancelText: "Cancelar",
};

WithCloseAlert.play = async ({ args }) => {
  const { onRequestClose } = args;

  args.onRequestClose = () => {
    alert("Modal fechado");
    onRequestClose();
  };
};
