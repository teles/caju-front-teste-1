import { useState, ChangeEvent } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
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
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const shouldTriggerValidation = cpfPattern.test(event.target.value);
    if (shouldTriggerValidation) {
      const isValid = cpfValidator.isValid(event.target.value);
      setCpfError(isValid ? "" : "CPF inválido");
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
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
