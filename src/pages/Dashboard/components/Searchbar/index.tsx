import { useState, ChangeEvent } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import { validateCpfChange, cpfMask } from "~/utils/cpfUtils";
import { useRegistrationContext } from "~/contexts/RegistrationContext";
import routes from "~/router/routes";
import * as S from "./styles";
import { showToast } from "~/utils/toastUtils";

export const SearchBar = () => {
  const history = useHistory();
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [previousCpf, setPreviousCpf] = useState("");
  const { fetchRegistrations } = useRegistrationContext();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleCpfChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value, error, isCompleted } = validateCpfChange(event.target.value);
    setCpf(value);
    setCpfError(error);

    if (isCompleted && !error && value !== previousCpf) {
      const response = await fetchRegistrations({ cpf: value });
      showToast(response);
      setPreviousCpf(value);
    } else if (!isCompleted && previousCpf) {
      const response = await fetchRegistrations();
      showToast(response);
      setPreviousCpf("");
    }
  };

  const handleRefresh = async () => {
    if (cpf && !cpfError && validateCpfChange(cpf).isCompleted) {
      const response = await fetchRegistrations({ cpf });
      showToast(response);
    } else {
      const response = await fetchRegistrations();
      showToast(response);
    }
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        mask={cpfMask}
        value={cpf}
        onChange={handleCpfChange}
        error={cpfError}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefresh}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
