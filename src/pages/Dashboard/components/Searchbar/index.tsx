import { useState, ChangeEvent } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";

const cpfMask = [
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

export const SearchBar = () => {
  const history = useHistory();
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleCpfChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
    if (isValidCpf(event.target.value)) {
      setCpfError("");
      console.log("CPF válido:", event.target.value);
    } else {
      setCpfError("CPF inválido");
    }
  };

  const isValidCpf = (cpf: string) => {
    const cleanedCpf = cpf.replace(/[^\d]/g, "");
    return cleanedCpf.length === 11;
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
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
