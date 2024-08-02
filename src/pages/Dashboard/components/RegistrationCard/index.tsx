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
              <ButtonSmall
                bgcolor="rgb(155, 229, 155)"
                onClick={() =>
                  openModal({
                    title: "Aprovar Review",
                    text: `Tem certeza que deseja aprovar o review de ${data?.employeeName}?`,
                    onConfirm: () => {},
                    confirmText: "Sim, aprovar",
                    cancelText: "Não, cancelar",
                  })
                }
              >
                Aprovar
              </ButtonSmall>
            </>
          ) : (
            <ButtonSmall
              bgcolor="#ff8858"
              onClick={() => {
                openModal({
                  title: "Revisar novamente",
                  text: `Tem certeza que deseja revisar novamente o review de ${data?.employeeName}?`,
                  onConfirm: () => {},
                  confirmText: "Sim, revisar",
                  cancelText: "Não, cancelar",
                });
              }}
            >
              Revisar novamente
            </ButtonSmall>
          )}
          <HiOutlineTrash
            onClick={() => {
              openModal({
                title: "Excluir",
                text: `Tem certeza que deseja excluir o registro de ${data?.employeeName}?`,
                onConfirm: () => {},
                confirmText: "Sim, excluir",
                cancelText: "Não, cancelar",
              });
            }}
          />
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
