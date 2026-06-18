import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormWithSuccess } from "@/components/FormWithSuccess";

test("hides the form and shows success on submit", async () => {
  const user = userEvent.setup();
  render(
    <FormWithSuccess formClassName="form" success={<p>Thank you.</p>}>
      <button type="submit">Send</button>
    </FormWithSuccess>,
  );
  await user.click(screen.getByRole("button", { name: "Send" }));
  expect(screen.getByText("Thank you.")).toBeVisible();
});
