import { ButtonSmall } from "~/components/Buttons";
import { Registration, RegistrationStatus } from "~/types/registration";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

type Props = {
  data?: Registration;
  isLoading?: boolean;
};

const RegistrationCard = ({ data, isLoading = false }: Props) => {
  return (
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
        {isLoading ? <S.Skeleton height="20px" /> : <span>{data?.email}</span>}
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
            <ButtonSmall bgcolor="rgb(255, 145, 154)">
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
  );
};

export default RegistrationCard;
