import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { apiClient } from "../api/client";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../store/loading";

interface IndexOption {
  label: string;
  value: string;
}

const DataViewSelection: React.FC<{
  search?: string;
  setSearch?: (index: string) => void;
}> = ({ search, setSearch }) => {
  const [dataViews, setDataViews] = useState<IndexOption[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoading());
    apiClient.dataViews().then((res) => {
      setDataViews([
        ...res.data.data_views.map((dataView: any) => {
          return { label: dataView.name, value: dataView.title };
        }),
      ]);
      dispatch(stopLoading());
    });
  }, []);

  return (
    <Select
      value={search}
      style={{ width: 150, marginRight: 5 }}
      onChange={(value) => {
        if (!setSearch) return;
        setSearch(value);
      }}>
      {dataViews
        .filter((dataView) => dataView.label !== "")
        .map((dataView) => {
          return (
            <Select.Option key={dataView.value} value={dataView.value}>
              {dataView.label}
            </Select.Option>
          );
        })}
    </Select>
  );
};

export default DataViewSelection;
