import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Divider, IconButton } from "@mui/material";
import moment from "moment";

export default function ReminderCard({ reminder, handleReminderCardClick }) {
  return (
    <li>
      <div>
        {`${reminder.city}, ${moment(new Date(reminder.date)).format(
          "h:mm A"
        )}`}
        {reminder.forecast && <div><span className="forecast">{`${reminder.forecast}`}</span></div>}
      </div>
      <span>{reminder.text}</span>
      <IconButton onClick={() => handleReminderCardClick(reminder)}>
        <EditIcon />
      </IconButton>
      <Divider sx={{ borderColor: "#F2EBE9", marginTop: "3px" }} />
    </li>
  );
}
