import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Container from "./container";
import Decimal from "../dashboard/decimal";
import { invertColor } from "../../utils/color";
import { SuperDatePicker } from "../../store/date";
import { useSelector } from "react-redux";
import jp from 'jsonpath';
import { query } from "../../utils/query";

interface IProps {
  dsl?: any;
  emit: (views: any) => void;
}

export const ValueConfig: React.FC<IProps> = ({ emit, dsl }) => {
  const [label, setLabel] = useState("");
  const [valuePath, setValuePath] = useState("");
  const [color, setColor] = useState("#ffffff");
  const create = () => {
    emit({
      type: "Value", views: {
        color: color,
        valueJsonPath: valuePath,
        viewLabel: label
      }, dsl: dsl
    })
  }
  return <div>
    <TextField value={label} onChange={(e) => setLabel(e.target.value)} id="filled-basic" label="View label" variant="filled" />
    <TextField value={valuePath} onChange={(e) => setValuePath(e.target.value)} id="filled-basic" label="Value JSON path" variant="filled" />
    <input value={color} onChange={(e) => {
      setColor(e.target.value)
    }} type="color" />
    <Button onClick={create}>Create</Button>
  </div>
}



export const ValueView: React.FC<any> = ({ props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const date: SuperDatePicker = useSelector((state: any) => state.date);
  const [value, setValue] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    query(props.dsl, date).then((res: any) => {
      setIsLoading(false);
      const v = jp.query(res.data, props.views.valueJsonPath);
      if (v.length === 0) return;
      setValue(v[0]);
    });
  }, [date]);
  return (
    <Container
      style={{
        borderRadius: 5,
        padding: 5,
        margin: 5,
        backgroundColor: props.views.color || "#ffffff"
      }}
      loading={isLoading}>
      <Decimal style={{
        color: invertColor(props.views.color || "#ffffff"),
      }} title={props.views.viewLabel} value={value}></Decimal>
    </Container>
  );
}
