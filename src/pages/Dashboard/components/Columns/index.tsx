import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { LoadingDots } from "~/components/LoadingDots";
import { Registration, RegistrationStatus } from "~/types/registration";

interface ColumnProps {
  status: RegistrationStatus;
  title: string;
}

const allColumns: ColumnProps[] = [
  { status: RegistrationStatus.REVIEW, title: "Pronto para revisar" },
  { status: RegistrationStatus.APPROVED, title: "Aprovado" },
  { status: RegistrationStatus.REPROVED, title: "Reprovado" },
];

type Props = {
  registrations?: Registration[];
  loading?: boolean;
};

const Collumns = ({ registrations, loading = false }: Props) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
                {loading && <LoadingDots />}
              </S.TitleColumn>
              <S.CollumContent>
                {loading === true && <RegistrationCard isLoading={loading} />}
                {loading === false &&
                  registrations?.length &&
                  registrations
                    ?.filter(
                      (registration) => collum.status === registration.status,
                    )
                    .map((registration) => {
                      return (
                        <RegistrationCard
                          data={registration}
                          key={registration.id}
                        />
                      );
                    })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
