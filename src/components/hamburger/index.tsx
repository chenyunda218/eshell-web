import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { open, close } from "../../store/sidebar";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { IconButton } from "@mui/material";
const Hamburger: React.FC = () => {
  const opened = useSelector((state: any) => state.sidebar.opened) as boolean;
  const dispatch = useDispatch();
  return (
    <IconButton onClick={() => {
      if (opened) {
        dispatch(close());
      } else {
        dispatch(open());
      }
    }}>
      {!opened ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
    </IconButton>
  );
};

export default Hamburger;
