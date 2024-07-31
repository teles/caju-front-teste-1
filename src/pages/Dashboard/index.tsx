import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import useRegistrations from "~/hooks/useRegistrations";

const DashboardPage = () => {
  const { registrations, loading } = useRegistrations();

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} loading={loading} />
    </S.Container>
  );
};
export default DashboardPage;
