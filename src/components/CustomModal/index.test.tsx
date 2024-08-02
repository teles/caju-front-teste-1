import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomModal from "./index";

describe("CustomModal", () => {
  const renderModal = (
    isOpen: boolean,
    onRequestClose: () => void,
    children: React.ReactNode,
  ) =>
    render(
      <CustomModal isOpen={isOpen} onRequestClose={onRequestClose}>
        {children}
      </CustomModal>,
    );

  it("should render modal with children when open", () => {
    const { getByText } = renderModal(
      true,
      jest.fn(),
      <div>Modal Content</div>,
    );
    expect(getByText("Modal Content")).toBeInTheDocument();
  });

  it("should not render modal content when closed", () => {
    const { queryByText } = renderModal(
      false,
      jest.fn(),
      <div>Modal Content</div>,
    );
    expect(queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("should call onRequestClose when close button is clicked", () => {
    const onRequestClose = jest.fn();
    const { getByLabelText } = renderModal(
      true,
      onRequestClose,
      <div>Modal Content</div>,
    );

    fireEvent.click(getByLabelText("close"));
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });
});
