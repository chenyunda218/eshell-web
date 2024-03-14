import { Button, IconButton, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from "react-redux";
import { SuperDatePicker } from "../../store/date";
import { query } from "../../utils/query";
import jp from 'jsonpath';
import Container from "./container";

export const TableConfig: React.FC<any> = ({ emit }) => {
  const [label, setLabel] = useState("");
  const [rowsJsonPath, setRowsJsonPath] = useState("$.aggregations.aggregations_rows.buckets");
  const [columns, setColumns] = useState<any[]>([]);
  const addColumn = () => {
    setColumns([...columns, { label: "", jsonPath: "" }])
  }
  const deleteColumn = (i: number) => {
    const newColumns = columns.slice();
    newColumns.splice(i, 1);
    setColumns(newColumns);
  }
  const create = () => {
    emit({
      type: "Table",
      views: {
        viewLabel: label,
        rowsJsonPath: rowsJsonPath,
        columns: columns
      }
    })
  }
  return (
    <div>
      <TextField value={label} onChange={(e) => setLabel(e.target.value)} id="filled-basic" label="View label" variant="filled" />
      <TextField value={rowsJsonPath} onChange={(e) => setRowsJsonPath(e.target.value)} id="filled-basic" label="Rows JSON path" variant="filled" />
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {columns.map((column, i) => {
          return <ListItem key={i}>
            <TextField value={column.label} onChange={(e) => {
              const newColumns = columns.slice();
              newColumns[i].label = e.target.value;
              setColumns(newColumns);
            }} id="filled-basic" label="Column label" variant="filled" />
            <TextField value={column.jsonPath} onChange={(e) => {
              const newColumns = columns.slice();
              newColumns[i].jsonPath = e.target.value;
              setColumns(newColumns);
            }} id="filled-basic" label="Column JSON path" variant="filled" />
            <IconButton onClick={() => deleteColumn(i)}><DeleteForeverIcon /></IconButton>
          </ListItem>
        })}
        <ListItem>
          <Button onClick={addColumn}>Add column</Button>
        </ListItem>
      </List>
      <Button onClick={create}>Create</Button>
    </div >
  );
}

export const TableView: React.FC<any> = ({ props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const date: SuperDatePicker = useSelector((state: any) => state.date);
  const [rows, setRows] = useState<any[][]>([]);
  useEffect(() => {
    setIsLoading(true);
    query(props.dsl, date).then((res: any) => {
      setIsLoading(false);
      const v = jp.query(res.data, props.views.rowsJsonPath);
      if (v.length === 0) {
        setRows([]);
        return;
      }
      setRows(v[0].map((row: any) => {
        return props.views.columns.map((column: any) =>
          jp.query(row, column.jsonPath)[0]);
      }));
    });
  }, [date]);
  const columns: any[] = useMemo(() => {
    return props.views.columns.map((column: any) => column.label);
  }, [props]);
  return (
    <Container loading={isLoading}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => {
                return <TableCell key={i}>{column}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.map((cell, i) => {
                  return <TableCell key={i} >{cell}</TableCell>
                })}
              </TableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}