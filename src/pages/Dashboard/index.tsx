import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useRegistrationContext } from "~/contexts/RegistrationContext";

const DashboardPage = () => {
  const { registrations, loading } = useRegistrationContext();

  return (
    <>
      <S.Container>
        <SearchBar />
        <Collumns registrations={registrations} loading={loading} />
      </S.Container>
    </>
  );
};

export default DashboardPage;
