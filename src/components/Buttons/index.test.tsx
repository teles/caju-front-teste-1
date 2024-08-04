import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Button from "./index";

describe("Button", () => {
  it("Should show button", () => {
    const { debug } = render(<Button>Ativar</Button>);
    expect(screen.getByRole("button", { name: /ativar/i })).toBeInTheDocument();
    debug();
  });
});
