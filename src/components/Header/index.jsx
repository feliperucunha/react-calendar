import React from "react";

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { Button, IconButton } from "@mui/material";

import { MONTHS } from '../../constants';

export default function Header({
  handleLeftClick,
  handleRightClick,
  handleNewReminderClick,
  currentDate,
}) {
  return (
    <header>
      <Button onClick={() => handleNewReminderClick()}>
        <AddIcon />
      </Button>
      <nav>
        <IconButton size="small" onClick={(e) => handleLeftClick()}>
          <ArrowBackIos />
        </IconButton>
        <h2>
          <span>{MONTHS[currentDate.getMonth()]}</span>
          {"  "}
          <span>
            {currentDate.getFullYear()}
          </span>
        </h2>
        <IconButton size="small" onClick={(e) => handleRightClick()}>
          <ArrowForwardIos />
        </IconButton>
      </nav>
    </header>
  );
}
