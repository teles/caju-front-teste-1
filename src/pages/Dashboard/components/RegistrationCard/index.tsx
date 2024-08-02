import { ButtonSmall } from "~/components/Buttons";
import { Registration, RegistrationStatus } from "~/types/registration";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { useState } from "react";
import ConfirmationModal from "~/components/ConfirmationModal";

type Props = {
  data?: Registration;
  isLoading?: boolean;
};

type ModalContent = {
  title: string;
  text: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

const RegistrationCard = ({ data, isLoading = false }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const openModal = (modalContent: ModalContent) => {
    setModalContent(modalContent);
    setIsModalOpen(true);
  };

  return (
    <>
      <S.Card>
        <S.IconAndText>
          <HiOutlineUser />
          {isLoading ? (
            <S.Skeleton height="24px" />
          ) : (
            <h3>{data?.employeeName}</h3>
          )}
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          {isLoading ? (
            <S.Skeleton height="20px" />
          ) : (
            <span>{data?.email}</span>
          )}
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          {isLoading ? (
            <S.Skeleton height="20px" />
          ) : (
            <span>{data?.admissionDate}</span>
          )}
        </S.IconAndText>
        <S.Actions>
          {data?.status === RegistrationStatus.REVIEW ? (
            <>
              <ButtonSmall
                bgcolor="rgb(255, 145, 154)"
                onClick={() =>
                  openModal({
                    title: "Reprovar Review",
                    text: `Tem certeza que deseja reprovar o review de ${data?.employeeName}?`,
                    onConfirm: () => {},
                    confirmText: "Sim, reprovar",
                    cancelText: "Não, cancelar",
                  })
                }
              >
                Reprovar {data?.status}
              </ButtonSmall>
              <ButtonSmall bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
            </>
          ) : (
            <ButtonSmall bgcolor="#ff8858">Revisar novamente</ButtonSmall>
          )}
          <HiOutlineTrash />
        </S.Actions>
      </S.Card>
      {modalContent && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          title={modalContent.title}
          text={modalContent.text}
          cancelText={modalContent.cancelText}
          confirmText={modalContent.confirmText}
          onConfirm={modalContent.onConfirm}
        />
      )}
    </>
  );
};

export default RegistrationCard;
