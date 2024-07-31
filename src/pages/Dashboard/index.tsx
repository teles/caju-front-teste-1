import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import useRegistrations from "~/hooks/useRegistrations";
import { useEffect } from "react";

const DashboardPage = () => {
  const { registrations, fetchRegistrations } = useRegistrations();
  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
