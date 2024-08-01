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
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const handleCpfChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, error } = validateCpfChange(event);
    setCpf(value);
    setCpfError(error);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailBlur = (event: ChangeEvent<HTMLInputElement>) => {
    // regex adaptada de https://pt.stackoverflow.com/a/1389
    const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const { value } = event.target;
    const isValid = emailPattern.test(value);
    setEmailError(isValid ? "" : "Email inválido");
  };

  const handleNameBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const hasAtLeastTwoLetters = /[a-zA-Z].*[a-zA-Z]/.test(value);
    const hasSpace = /\s/.test(value);
    const startsWithNumber = /^\d/.test(value);

    if (!hasAtLeastTwoLetters) {
      setNameError("O nome deve conter pelo menos duas letras.");
    } else if (!hasSpace) {
      setNameError("O nome deve conter pelo menos um espaço.");
    } else if (startsWithNumber) {
      setNameError("O nome não pode começar com um número.");
    } else {
      setNameError("");
    }
  };

  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome"
          label="Nome"
          value={name}
          onBlur={handleNameBlur}
          onChange={handleNameChange}
          error={nameError}
        />
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailError}
        />
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
