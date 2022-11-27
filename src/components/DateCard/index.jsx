import React from "react";

export default function DateCard({
  day,
  reminders,
  currentDateId,
  handleCardClick,
  handleNewReminderClick
}) {

  return (
    <div
      key={day.id}
      className={`date-card ${day.active ? "active" : ""}`}
      onDoubleClick={() => handleNewReminderClick()}
      style={{
        backgroundColor: "white",
        position: "relative",
        color: day.id && (day.id === currentDateId) ? "#304c89" : !day.active ? "#cecece" : "#b5ac80",
        fontWeight: day.id && (day.id === currentDateId) ? "1000" : "normal",
      }}
      onClick={(e) => handleCardClick(day)}
    >
      {day.day}
      {reminders[day.id] && reminders[day.id].length > 0 && (
        <span className="reminder-count">
          <span>{reminders[day.id].length}</span>
        </span>
      )}
    </div>
  );
}
