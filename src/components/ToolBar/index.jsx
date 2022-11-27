import React from "react";

import ReminderCard from "../ReminderCard";

export default function ToolBar({
  currentDateId,
  formatRemindersHeader,
  remindersText,
  reminders,
  reminderText,
  handleReminderCardClick,
}) {

  return (
    <aside className="calendar-wrapper__calendar-reminders">
      <h2>
        {currentDateId
          ? formatRemindersHeader(currentDateId)
          : remindersText}
      </h2>
      {reminders[currentDateId] &&
        reminders[currentDateId].length > 0 && (
          <h4>{`${reminders[currentDateId].length} ${
            reminders[currentDateId].length > 1 ? remindersText : reminderText
          }`}</h4>
        )}
      {reminders[currentDateId] && (
        <ul>
          {reminders[currentDateId]
            .sort((a, b) => +new Date(a.date) - +new Date(b.date))
            .map((reminder) => (
              <ReminderCard
                key={reminder.key}
                reminder={reminder}
                handleReminderCardClick={handleReminderCardClick}
              />
            ))}
        </ul>
      )}
    </aside>
  );
}
