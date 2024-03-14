import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Banner: React.FC<{}> = ({}) => {
  const loading = useSelector((state: any) => state.loading.loading) as boolean;
  const nav = useNavigate();
  return (
    <div
      onClick={() => {
        nav("/");
      }}
      style={{
        cursor: "pointer",
        height: 48,
        width: 250,
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}>
      <div className={`lds-circle${loading ? " loading" : ""}`}>
        <img style={{ height: 24, width: 24 }} src="/icon.jpg" />
      </div>
      <span style={{ marginLeft: 8 }}>BoardWare 態勢感知</span>
    </div>
  );
};

export default Banner;
