import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { apiClient } from "../../../api/client";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "../../../api/models";

const CreateDashboard: React.FC = () => {
  const [name, setName] = useState("");
  const nav = useNavigate();
  const createDashboard = () => {
    apiClient.createDashboard(name).then((res: any) => {
      nav(`/dashboard/${res.data.id}`)
    });
  }
  return (
    <div>
      <TextField onChange={(e) => setName(e.target.value)} value={name} id="outlined-basic" label="Name" variant="outlined" />
      <Button onClick={createDashboard} variant="text">Create</Button>
    </div>
  );
};

export default CreateDashboard;