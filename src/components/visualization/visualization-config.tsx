import React from "react";
import { VisualizationType } from "./visualization";
import { ValueConfig } from "./value";
import { apiClient } from "../../api/client";
import { useNavigate, useParams } from "react-router-dom";
import { TableConfig } from "./table";

interface IProps {
  dsl?: any
  visualizationType: VisualizationType
}

const VisualizationConfig: React.FC<IProps> = ({ visualizationType, dsl }) => {
  let { id } = useParams();
  const nav = useNavigate();
  const create = (view: { type: string, dsl: any, views: any }) => {
    apiClient.getDashboardVisualizations(id!).then((visualizations) => {
      if (!visualizations) {
        return apiClient.updateDashboardVisualizations(id!, [view])
      }
      return apiClient.updateDashboardVisualizations(id!, [...visualizations.data, view])
    }).then(() => {
      nav("/dashboard/" + id);
    })
  }
  const ConfigView = React.useMemo(() => {
    switch (visualizationType) {
      case VisualizationType.Value:
        return <ValueConfig dsl={dsl} emit={create} />;
      case VisualizationType.Table:
        return <TableConfig emit={(e: any) => create({ ...e, dsl: dsl })} />;
      default:
        return <div>N/A</div>
    }
  }, [visualizationType, dsl])
  return (
    <div>
      {ConfigView}
    </div>
  )
}

export default VisualizationConfig;