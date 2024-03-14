import React, { useEffect, useMemo } from "react";
import { ValueView } from "./value";
import { VisualizationType } from "./visualization";
import { Button } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TableView } from "./table";

interface IProps {
  props: any;
  editable?: boolean;
  deleteView?: () => void;
  moveUp?: () => void;
  moveDown?: () => void;
}

const VisualizationView: React.FC<IProps> = ({ props, editable, deleteView, moveUp, moveDown }) => {
  const view = useMemo(() => {
    switch (props.type) {
      case VisualizationType.Value:
        return <ValueView editable={editable} props={props}></ValueView>
      case VisualizationType.Table:
        return <TableView props={props} />
      default:
        return <div>N/A</div>
    }
  }, [props])
  return (
    <>
      {editable && (
        <div style={{ padding: 5 }}>
          <Button color="error" variant="contained" onClick={deleteView}><DeleteForeverIcon /></Button>
          <Button onClick={moveUp}><KeyboardArrowUpIcon /></Button>
          <Button onClick={moveDown}><KeyboardArrowDownIcon /></Button>
        </div>
      )}
      {view}
    </>
  );
}

export default VisualizationView;