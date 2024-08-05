/// <reference types="cypress" />

import { Registration } from "~/types/registration";

const newUser: Registration = {
  name: `Maria Souza ${new Date().getTime()}`,
  email: "maria@example.com",
  cpf: "01234567890",
  admissionDate: "2024-08-03",
};
const cpfMasked = "012.345.678-90";

describe("Testes E2E do Dashboard", () => {
  before(() => {
    // Navegar para a página inicial
    cy.visit("http://localhost:3001/#/dashboard");
  });

  it("Realiza o fluxo completo do dashboard", () => {
    // Digita um CPF que não é valido
    cy.get('input[name="cpf"]').type("12345678901");
    cy.get('[aria-label="error-message"]')
      .should("be.visible")
      .and("contain", "CPF inválido");

    // Clica para adicionar novo cadastro
    cy.get('button[aria-label="nova-admissao"]').click();
    // Verifica que a URL mudou para a página de novo usuário
    cy.url().should("include", "/new-user");

    // Adiciona novo cadastro com todas as informações
    cy.get('input[name="name"]').type(newUser.name);
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('input[name="admissionDate"]').type(newUser.admissionDate);
    cy.get('input[name="cpf"]').type(newUser.cpf);
    cy.contains("Cadastrar").click();

    // Cancela a operação
    cy.get('button[aria-label="cancel"]').click();

    // Clica novamente em Cadastrar
    cy.contains("Cadastrar").click();
    // Clica em confirmar no modal
    cy.get('[aria-label="confirm"]').click();

    // Verifica que voltou para a tela inicial
    cy.url().should("include", "/dashboard");

    // Verifica no Dashboard que o item adicionado está na coluna de revisão
    cy.contains(newUser.name).parents("[aria-label='review']").should("exist");

    // Move o cartão para Reprovado e verifica que está na coluna reprovado
    cy.contains(newUser.name)
      .parents('[data-testid="registration-card"]')
      .find('button[aria-label="Reprovar"]')
      .click();

    // Clica em confirmar no modal
    cy.get('[aria-label="confirm"]').click();

    cy.contains(newUser.name)
      .parents("[aria-label='reproved']")
      .should("exist");

    // Clica em Revisar novamente e verifica que está na coluna de revisão
    cy.contains(newUser.name)
      .parents('[data-testid="registration-card"]')
      .find('[aria-label="Revisar novamente"]')
      .click();

    // Clica em confirmar no modal
    cy.get('[aria-label="confirm"]').click();

    cy.contains(newUser.name).parents("[aria-label='review']").should("exist");

    // Move para Aprovado e verifica que está na coluna aprovado
    cy.contains(newUser.name)
      .parents('[data-testid="registration-card"]')
      .find('button[aria-label="Aprovar"]')
      .click();

    // Clica em confirmar no modal
    cy.get('[aria-label="confirm"]').click();

    cy.contains(newUser.name)
      .parents("[aria-label='approved']")
      .should("exist");

    // Digita o CPF do cadastro no input de CPF e verifica que somente um card foi encontrado
    cy.get('input[name="cpf"]').type(newUser.cpf);
    cy.get('[data-testid="registration-card"]')
      .contains(newUser.name)
      .should("have.length", 1)
      .and("contain", newUser.name);

    // Clica na lixeira para deletar esse registro e verifica que o registro não está mais na lista
    cy.contains(newUser.name)
      .parents('[data-testid="registration-card"]')
      .find('[aria-label="Excluir"]')
      .click();

    // Clica em confirmar no modal
    cy.get('[aria-label="confirm"]').click();

    // Verifica que o registro não está mais na lista
    cy.contains(newUser.name).should("not.exist");

    // Verifica que o CPF ainda está digitado no campo de CPF
    cy.get('input[name="cpf"]').should("have.value", cpfMasked);

    // Verifica que não existem mais registros nas colunas
    cy.get('[aria-label="approved"] [data-testid="registration-card"]').should(
      "not.exist",
    );
    cy.get('[aria-label="reproved"] [data-testid="registration-card"]').should(
      "not.exist",
    );
    cy.get('[aria-label="review"] [data-testid="registration-card"]').should(
      "not.exist",
    );

    // Remove CPF do campo de CPF
    cy.get('input[name="cpf"]').clear();

    // Verifica que o campo de CPF está vazio
    cy.get('input[name="cpf"]').should("have.value", "");
  });
});
