import React, { useState, useEffect, useContext } from "react";

import moment from "moment";
import { nanoid } from "nanoid";

import { DateCard, Header, ReminderCard, ReminderModal, ToolBar } from '../../components';
import { DAYS_OF_THE_WEEK, DATE_FORMAT } from "../../constants";
import { MainContext } from "../../context";
import { reminderText, remindersText } from "../../locales/en";
import { getDaysArray } from '../../utils'

function Calendar() {
  const {
    state: { reminders },
    actions,
  } = useContext(MainContext);

  const [days, setDays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDateId, setCurrentDateId] = useState(new Date().toDateString());
  const [openModal, setOpenModal] = useState(false);
  const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);
  const [newReminder, setNewReminder] = useState({
    date: moment(new Date()).format(DATE_FORMAT),
  });
  const [editReminder, setEditReminder] = useState();

  const loadMonth = (date) => {
    const days = getDaysArray(date);
    setDays(days);
  };

  useEffect(() => {
    loadMonth(currentDate);
  }, [currentDate]);

  const formatRemindersHeader = (date) => {
    return moment(new Date(date)).format("MMMM Do");
  };

  const handleEditReminder = async () => {
    const dateId = new Date(editReminder.initialReminderDate).toDateString();
    if (deleteButtonPressed) {
      await actions.deleteReminder(dateId, editReminder.id, editReminder);
      setOpenModal(false);
      setEditReminder();
    }
    await actions.editReminder(dateId, editReminder.id, editReminder);
    setOpenModal(false);
    setEditReminder();
  };

  const handleAddReminder = async () => {
    try {
      const dateId = new Date(newReminder.date).toDateString();
      const reminder = {
        id: nanoid(),
        text: newReminder.text,
        city: newReminder.city,
        initialReminderDate: newReminder.date,
        date: newReminder.date,
      };
      await actions.addReminder(dateId, reminder);
      setOpenModal(false);
      setNewReminder({
        date: moment(new Date()).format(DATE_FORMAT),
      });
    } catch (error) {
      actions.openSnackbar({
        severity: "error",
        message: error.message,
      });
      setOpenModal(false);
      setNewReminder({
        date: moment(new Date()).format(DATE_FORMAT),
      });
    }
  };
  const handleCardClick = (day) => {
    if (!day.active) return;
    setCurrentDateId(
      `${new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day.day
      ).toDateString()}`
    );
    setNewReminder((oldSt) => ({
      ...oldSt,
      date: moment(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day)
      ).format(DATE_FORMAT),
    }));
  };
  const handleReminderCardClick = (reminder) => {
    setEditReminder(reminder);
    setOpenModal(true);
  };

  const handleLeftClick = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - 1);
    setCurrentDate(date);
    loadMonth(date);
  };
  const handleRightClick = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    setCurrentDate(date);
    loadMonth(date);
  };
  const handleNewReminderClick = () => {
    setOpenModal(true);
    setEditReminder(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewReminder(() => ({
      date: newReminder.date
        ? newReminder.date
        : moment(new Date()).format(DATE_FORMAT),
    }));
  };

  return (
    <div className="container">
      {days.length > 0 && (
        <section className="calendar-wrapper">
          <div>
            <Header
              currentDate={currentDate}
              handleLeftClick={handleLeftClick}
              handleRightClick={handleRightClick}
              handleNewReminderClick={handleNewReminderClick}
            />
            <main className="calendar-wrapper__grid-wrapper">
              {DAYS_OF_THE_WEEK.map((day) => {
                return (
                  <span className="header" key={day}>
                    {day}
                  </span>
                );
              })}
              {days.map((day) => (
                <DateCard
                  handleNewReminderClick={handleNewReminderClick}
                  day={day}
                  currentDateId={currentDateId}
                  reminders={reminders}
                  handleCardClick={handleCardClick}
                />
              ))}
            </main>
          </div>
          <ToolBar 
            currentDateId={currentDateId}
            formatRemindersHeader={formatRemindersHeader}
            remindersText={remindersText}
            reminders={reminders}
            reminderText={reminderText}
            handleReminderCardClick={handleReminderCardClick}
          />
        </section>
      )}
      {openModal && (
        <ReminderModal
          reminderDate={
            currentDateId
              ? moment(new Date(currentDateId)).format(DATE_FORMAT)
              : moment(new Date()).format(DATE_FORMAT)
          }
          handleSubmit={Boolean(editReminder) ? handleEditReminder : handleAddReminder}
          reminder={Boolean(editReminder) ? editReminder : newReminder}
          setReminder={Boolean(editReminder) ? setEditReminder : setNewReminder}
          handleCloseModal={handleCloseModal}
          editing={Boolean(editReminder)}
          setDeleteButtonPressed={setDeleteButtonPressed}
        />
      )}
    </div>
  );
}

export default Calendar;
