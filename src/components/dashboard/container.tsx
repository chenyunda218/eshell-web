import { LinearProgress } from "@mui/material";
import React from "react";

interface IProps {
  style?: React.CSSProperties;
  loading?: boolean;
  children: React.ReactNode;
  title?: string;
}

const Container: React.FC<IProps> = ({ style, loading, children, title }) => {
  return (
    <div
      className={"dashboard-container"}
      style={{ backgroundColor: "#ffffff", padding: 5, ...style }}>
      {title}
      {loading && <LinearProgress></LinearProgress>}
      {children}
    </div>
  );
};

export default Container;
