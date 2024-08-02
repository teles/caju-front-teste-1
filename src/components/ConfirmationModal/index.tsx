import CustomModal, { CustomModalProps } from "~/components/CustomModal";
import Button from "~/components/Buttons";
import styled from "styled-components";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ModalTitle = styled.h3`
  margin: 8px 0;
  font-size: 24px;
  font-weight: 600;
`;

const ModalText = styled.p`
  margin-bottom: 16px;
`;

type Props = Omit<CustomModalProps, "children"> & {
  title: string;
  text: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  title,
  text,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: Props) => {
  return (
    <CustomModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalText>{text}</ModalText>
        <ModalActions>
          <Button onClick={onRequestClose} themeType="secondary">
            {cancelText}
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </ModalActions>
      </ModalContent>
    </CustomModal>
  );
};

export default ConfirmationModal;
