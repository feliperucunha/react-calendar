import React, { useState, createContext } from "react";

import { weatherError, reminderEditMessage, reminderSuccessMessage } from "../../locales/en";
import { getForecast } from '../../services';


export const MainContext = createContext({});

export const MainProvider = ({ children }) => {
  const [reminders, setReminders] = useState({});
  const [snackbar, setSnackbar] = useState();

  const addReminder = async (dateId, reminderData, editing = false) => {
    const forecast = await getForecast(
      reminderData.city,
      reminderData.date
    );

    if (!forecast) {
      setSnackbar({
        severity: "warning",
        message: weatherError,
      });
    } else {
      setSnackbar({
        severity: "success",
        message: !editing ? reminderSuccessMessage : reminderEditMessage,
      });
    }
    setReminders((oldSt) => {
      reminderData.forecast = forecast;
      if (!oldSt[dateId]) {
        oldSt[dateId] = [reminderData];
      } else {
        oldSt[dateId].push(reminderData);
      }
      return oldSt;
    });
  };

  const deleteReminder = (dateId, reminderId) => {
    setReminders((oldSt) => {
      oldSt[dateId] = oldSt[dateId].filter(
        (reminder) => reminder.id !== reminderId
      );
      return oldSt;
    });
  };

  const editReminder = async (dateId, reminderId, reminderData) => {
    const editingReminder = true;
    const newDateId = new Date(reminderData.date).toDateString();
    let remindersCp = { ...reminders };
    let targetReminder = remindersCp[dateId].find(
      (reminder) => reminder.id === reminderId
    );
  
    if (!targetReminder) return;

    deleteReminder(dateId, reminderId);
    reminderData.initialReminderDate = reminderData.date;
    await addReminder(newDateId, reminderData, editingReminder);
  };

  const openSnackbar = (data) => {
    setSnackbar(data);
  };

  const closeSnackbar = () => {
    setSnackbar();
  };

  return (
    <MainContext.Provider
      value={{
        state: { reminders, snackbar },
        actions: {
          addReminder,
          deleteReminder,
          editReminder,
          openSnackbar,
          closeSnackbar,
        },
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
