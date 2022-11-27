import { render, fireEvent, screen } from "@testing-library/react";

import ReminderModal from "./ReminderModal";

test("ReminderModal 30 maximum length input test", () => {
  render(<ReminderModal           
    reminderDate={new Date().toDateString()}
    handleSubmit={(() => {})}
    reminder={(() => {})}
    setReminder={(() => {})}
    handleCloseModal={(() => {})}
    editing={false}
    setDeleteButtonPressed={null} 
  />);
  
  //entering 31 characters
  fireEvent.click(screen.getByText(/reminder/i), {
    target: { value : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
  });
  //expecting to have only 30
  expect(screen.getByText(/^reminder:/i)).toHaveTextContent("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

});
