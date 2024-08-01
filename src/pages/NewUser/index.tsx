import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { cpfMask, validateCpfChange } from "~/utils/cpfUtils";
import { ChangeEvent, useState } from "react";

const NewUserPage = () => {
  const history = useHistory();
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");

  const handleCpfChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, error } = validateCpfChange(event);
    setCpf(value);
    setCpfError(error);
  };

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField placeholder="Nome" label="Nome" />
        <TextField placeholder="Email" label="Email" type="email" />
        <TextField
          placeholder="CPF"
          mask={cpfMask}
          value={cpf}
          onChange={handleCpfChange}
          error={cpfError}
        />
        <TextField label="Data de admissão" type="date" />
        <Button onClick={() => {}}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
