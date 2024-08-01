import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { cpfMask, validateCpfChange } from "~/utils/cpfUtils";

const NewUserPage = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      cpf: "",
      admissionDate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(
          /[a-zA-Z].*[a-zA-Z]/,
          "O nome deve conter pelo menos duas letras.",
        )
        .matches(/\s/, "O nome deve conter pelo menos um espaço.")
        .matches(/^\D/, "O nome não pode começar com um número.")
        .required("Nome é obrigatório"),
      email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
      cpf: Yup.string()
        .test(
          "isValidCpf",
          "CPF inválido",
          (value) => validateCpfChange(value ?? "").error === "",
        )
        .required("CPF é obrigatório"),
      admissionDate: Yup.date().required("Data de admissão é obrigatória"),
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            placeholder="Nome"
            label="Nome"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
          />
          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
          <TextField
            placeholder="CPF"
            mask={cpfMask}
            name="cpf"
            label="CPF"
            value={formik.values.cpf}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.cpf && formik.errors.cpf ? formik.errors.cpf : ""
            }
          />
          <TextField
            label="Data de admissão"
            type="date"
            name="admissionDate"
            value={formik.values.admissionDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.admissionDate && formik.errors.admissionDate
                ? formik.errors.admissionDate
                : ""
            }
          />
          <Button type="submit">Cadastrar</Button>
        </form>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
