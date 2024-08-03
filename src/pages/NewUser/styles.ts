import styled from "styled-components";
import { _IconButtonStyled } from "~/components/Buttons/IconButton";
import Button from "~/components/Buttons";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
`;

export const Card = styled.div`
  border: 2px solid #f0f0f0;
  width: 500px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 100%;

  ${_IconButtonStyled} {
    margin-bottom: 8px;
    align-items: flex-start;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${Button} {
      align-self: flex-end;
    }
  }
`;
