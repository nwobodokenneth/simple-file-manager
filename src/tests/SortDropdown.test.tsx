import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom';
import SortDropdown from "../components/SortDropdown";

const mockOnSortChange = jest.fn();


beforeEach(() => {
   render(<SortDropdown onSortChange={mockOnSortChange} />);

});

describe("SortDropdown Component", () => {
   it("renders the dropdown button", () => {
      expect(screen.getByRole("button", { name: /sort by/i })).toBeInTheDocument();
   });

   it("opens the dropdown menu on click", () => {
      const button = screen.getByRole("button", { name: /sort by/i });
      fireEvent.click(button);
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Date")).toBeInTheDocument();
   });

   test("selects an option and calls onSortChange", async () => {

      fireEvent.click(screen.getByRole("button", {name: /sort by/i}));

      await waitFor(() => {
         expect(screen.getByText("Name")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Name"));

      await waitFor(() => {
         expect(mockOnSortChange).toHaveBeenCalledWith("name", "desc");
      });
   });

   it("toggles sorting order on subsequent selections", async () => {
      fireEvent.click(screen.getByRole("button", { name: /sort by/i }));

      await waitFor(() => {
         expect(screen.getByText("Date")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Date"));

      await waitFor(() => {
         expect(mockOnSortChange).toHaveBeenCalledWith("added", "desc");
      });

      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
         expect(screen.getByText("Date")).toBeInTheDocument();
      });
      fireEvent.click(screen.getByText("Date"));

      await waitFor(() => {
         expect(mockOnSortChange).toHaveBeenCalledWith("added", "asc");
      });
   });
});
