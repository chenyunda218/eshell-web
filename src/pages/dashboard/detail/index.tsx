import { Button, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../../api/client";
import VisualizationView from "../../../components/visualization/visualization-view";
import { Popconfirm } from "antd";

const DashboardDetail: React.FC = () => {
  let { id } = useParams();
  const [editable, setEditable] = useState(false)
  const [vis, setVis] = useState<any[]>([])
  const nav = useNavigate()
  const deleteView = (i: number) => {
    const newVis = vis ? (vis.filter((_, index) => index !== i)) : [];
    apiClient.updateDashboardVisualizations(id!, newVis).then(() => {
      return apiClient.getDashboardVisualizations(id!)
    }).then((e: any) => {
      if (!e.data) {
        setVis([]);
        return;
      }
      setVis(e.data);
    }).catch(() => {
      nav("/dashboard")
    });
  }
  useEffect(() => {
    apiClient.getDashboardVisualizations(id!).then((e: any) => {
      if (!e.data) {
        setVis([]);
        return;
      }
      setVis(e.data)
    })
  }, [id])
  const moveDown = (i: number) => {
    if (i === vis.length - 1) return;
    const newVis = [...vis];
    const temp = newVis[i];
    newVis[i] = newVis[i + 1];
    newVis[i + 1] = temp;
    apiClient.updateDashboardVisualizations(id!, newVis).then(() => {
      return apiClient.getDashboardVisualizations(id!)
    }).then((e: any) => {
      if (!e.data) {
        setVis([]);
        return;
      }
      setVis(e.data);
    })
  }
  const moveUp = (i: number) => {
    if (i === 0) return;
    const newVis = vis ? [...vis] : [];
    const temp = newVis[i];
    newVis[i] = newVis[i - 1];
    newVis[i - 1] = temp;
    apiClient.updateDashboardVisualizations(id!, newVis).then(() => {
      return apiClient.getDashboardVisualizations(id!)
    }).then((e: any) => {
      if (!e.data) {
        setVis([]);
        return;
      }
      setVis(e.data);
    })
  }
  const deleteDashboard = () => {
    apiClient.deleteDashboard(id!).then(() => {
      nav("/dashboard")
    }).catch((e: any) => { console.log(e) })
  }
  return (
    <div>
      <div><Button onClick={() => {
        nav("/dashboard/" + id + "/create-visualization")
      }}>Create visualization</Button>
        Edit<Switch value={editable} onChange={(e) => {
          setEditable(e.target.checked)
        }} />
        {
          editable &&
          <Popconfirm
            onConfirm={deleteDashboard}
            title="Delete the dashboard"
            description="Are you sure to delete this dashboard?"
            okText="Yes"
            cancelText="No"
          >
            <Button onClick={() => { }} color="error">Delete</Button>
          </Popconfirm>
        }
      </div>
      {vis.map((e, i) => {
        return <VisualizationView moveDown={() => moveDown(i)} moveUp={() => moveUp(i)} deleteView={() => {
          deleteView(i)
        }} editable={editable} key={i} props={e} />
      })}
    </div>
  );
}

export default DashboardDetail;