import React from "react";
import { Col, Row } from "antd";
import AvailableFields from "./available-fields";
import { Hits, Path } from "../models/Result";
import SearchTable from "./search-table";
const SearchContent: React.FC<{ availablePaths: Path[]; hits: Hits }> = ({
  availablePaths,
  hits,
}) => {
  const [selectedFields, setSelectedFields] = React.useState<string[]>([]);
  const selectedPaths = React.useMemo(() => {
    return [new Path(["person", "age"])];
  }, []);
  return (
    <div
      style={{
        height: `calc(100% - 42px)`,
      }}>
      <Row style={{}}>
        <Col span={18} push={6}>
          <SearchTable
            selectedFields={selectedFields}
            selectedPaths={selectedPaths}
            hits={hits}></SearchTable>
        </Col>
        <Col span={6} pull={18}>
          <AvailableFields
            style={{ height: "100%" }}
            selectedFields={selectedFields}
            setSelectedFields={setSelectedFields}
            fields={availablePaths.map((path) => path.jsonPath())}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SearchContent;
