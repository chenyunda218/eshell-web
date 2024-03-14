import React from "react";

interface IProps {
  title: string;
  value?: number;
  style?: React.CSSProperties;
}

const Decimal: React.FC<IProps> = ({ style, title, value }) => {
  return (
    <div
      style={{
        ...style,
        height: 100,
        position: "relative",
      }}>
      <div style={{ fontSize: 16, position: "absolute", top: 0, left: 0 }}>
        {title}
      </div>
      <div style={{ fontSize: 34, position: "absolute", right: 0, bottom: 0 }}>
        <b style={{}}>{value ? value : "N/A"}</b>
      </div>
    </div>
  );
};

export default Decimal;
