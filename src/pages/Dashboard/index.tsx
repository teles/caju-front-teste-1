import { useRegistrationContext } from "~/contexts/RegistrationContext";

import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import * as S from "./styles";

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
