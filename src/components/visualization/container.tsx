import { LinearProgress } from "@mui/material";
import React from "react";

interface IProps {
  style?: React.CSSProperties;
  loading?: boolean;
  children: React.ReactNode;
  title?: string;
  editable?: boolean;
}

const Container: React.FC<IProps> = ({ style, loading, children, title, editable }) => {
  return (
    <div
      className={"dashboard-container"}
      style={{ backgroundColor: "#ffffff", padding: 5, ...style }}>
      {title}
      {loading && <LinearProgress></LinearProgress>}
      {editable && <div style={{ position: "absolute", right: 10, top: 10 }}>Edit</div>}
      {children}
    </div>
  );
};

export default Container;
