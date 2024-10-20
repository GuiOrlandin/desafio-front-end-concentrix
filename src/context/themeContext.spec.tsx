import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ThemeContext, ThemeContextProvider } from "./ThemeContext";

describe("Theme context", () => {
  it("should toggle theme", async () => {
    render(
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {({ handleToggleTheme, theme }) => (
            <div>
              <button
                data-testid="toggle-button"
                onClick={() => handleToggleTheme()}
              >
                Mudar o tema
              </button>

              <div data-testid="theme-display">{theme}</div>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeContextProvider>
    );

    const toggleThemeButton = screen.getByTestId("toggle-button");
    const themeDisplay = screen.getByTestId("theme-display");

    userEvent.click(toggleThemeButton);

    await waitFor(() => {
      expect(themeDisplay).toHaveTextContent("dark");
    });

    userEvent.click(toggleThemeButton);

    await waitFor(() => {
      expect(themeDisplay).toHaveTextContent("light");
    });
  });
});
