import React from "react";
import { Table, Typography } from "antd";
import type { TableColumnsType } from "antd";

interface FixedDataType {
  key: React.Key;
  name: string;
  description: string;
}

const fixedColumns: TableColumnsType<FixedDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    fixed: true,
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
];

const fixedData: FixedDataType[] = [];
for (let i = 0; i < 20; i += 1) {
  fixedData.push({
    key: i,
    name: ["Light", "Bamboo", "Little"][i % 3],
    description: "Everything that has a beginning, has an end.",
  });
}

const App: React.FC = () => (
  <Table
    columns={fixedColumns}
    dataSource={fixedData}
    pagination={false}
    scroll={{ x: 1000, y: 200 }}
    bordered
    summary={() => (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            This is a summary content
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    )}
  />
);

export default App;
