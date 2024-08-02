import styled from "styled-components";

type ButtonTheme = {
  backgroundColor: string;
  color: string;
};

const themes: Record<string, ButtonTheme> = {
  primary: {
    backgroundColor: "#64a98c",
    color: "#fff",
  },
  secondary: {
    backgroundColor: "#b0b0b0",
    color: "#fff",
  },
};

const Button = styled.button<{
  themeType?: "primary" | "secondary";
}>`
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 36px;
  padding: 8px 32px;
  cursor: pointer;
  height: 56px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;
  background-color: ${(props) =>
    themes[props.themeType || "primary"].backgroundColor};
  color: ${(props) => themes[props.themeType || "primary"].color};
`;

export const ButtonSmall = styled.button<{
  bgcolor?: string;
  color?: string;
  isDisabled?: boolean;
}>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.bgcolor ?? "none"};
  color: ${(props) => props.color ?? "#000"};
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
`;

export default Button;
