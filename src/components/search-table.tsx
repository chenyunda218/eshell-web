import React, { useEffect, useMemo } from "react";
import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { Hits, Path } from "../models/Result";

const DocumentKey = "__document";

const SearchTable: React.FC<{
  hits: Hits;
  selectedPaths: Path[];
  selectedFields: string[];
}> = ({ hits, selectedFields }) => {
  const dataSources = useMemo(() => {
    return hits.hits.map((hit) => {
      let obj: any = {};
      hit._source.getPaths().forEach((path) => {
        obj[DocumentKey] = hit._source.getDocument();
        obj["key"] = hit._id;
        const value = hit._source.getValue(path);
        if (Array.isArray(value)) {
          obj[path.jsonPath()] = "[" + value.join(", ") + "]";
        } else {
          obj[path.jsonPath()] = value;
        }
        obj["@timestamp"] = hit.timestamp?.toISOString();
      });
      return obj;
    });
  }, [hits]);
  const columns = useMemo(() => {
    let showTimestamp = false;
    let columns: TableColumnsType<any> = selectedFields.map((field) => {
      if (field === "@timestamp") {
        showTimestamp = true;
      }
      return {
        title: field,
        dataIndex: field,
      };
    });
    if (showTimestamp) {
      return columns;
    }
    return [
      {
        title: "@timestamp",
        dataIndex: "@timestamp",
        width: 200,
      },
      ...columns,
    ];
  }, [dataSources, selectedFields]);

  return (
    <Table
      style={{}}
      columns={columns}
      dataSource={dataSources}
      pagination={{ pageSize: 50 }}
      scroll={{ y: 500, x: 500 }}
    />
  );
};

export default SearchTable;
