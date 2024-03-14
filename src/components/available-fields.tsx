import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { AutoComplete, Button, Collapse, Tag } from "antd";
import {
  CaretRightOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const SearchField: React.FC<{
  fields: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}> = ({ value, setValue }) => {
  const onChange = (data: string) => {
    setValue(data);
  };
  return (
    <AutoComplete
      style={{ width: "100%" }}
      allowClear
      value={value}
      onChange={onChange}
      placeholder="Search field names"
    />
  );
};

function Title(label: string, lenght: number) {
  return (
    <div
      style={{
        justifyContent: "space-between",
        flex: "flex",
        width: "100%",
        display: "flex",
      }}>
      <div>{label}</div>
      <Tag color="#108ee9">{lenght}</Tag>
    </div>
  );
}

const Field: React.FC<{
  field: string;
  remove?: boolean;
  onSelect: (field: string) => void;
}> = ({ field, remove = false, onSelect }) => {
  const [hover, setHover] = useState(false);
  const style = useMemo(() => {
    if (hover) {
      return {};
    }
    return {
      display: "none",
    };
  }, [hover]);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer",
        justifyContent: "space-between",
        flex: "flex",
        width: "100%",
        display: "flex",
        height: 30,
      }}>
      <div
        style={{
          width: 180,
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}>
        {field}
      </div>
      <Button
        onClick={() => onSelect(field)}
        style={style}
        type="primary"
        shape="circle"
        size="small"
        icon={
          remove ? <CloseCircleOutlined /> : <CheckCircleOutlined />
        }></Button>
    </div>
  );
};

const FieldsList: React.FC<{
  fields: string[];
  remove?: boolean;
  onSelect: (field: string) => void;
}> = ({ fields, remove = false, onSelect }) => {
  return (
    <div>
      {fields.map((field) => (
        <Field
          onSelect={onSelect}
          remove={remove}
          field={field}
          key={field}></Field>
      ))}
    </div>
  );
};

const AvailableFields: React.FC<{
  style?: CSSProperties | undefined;
  fields?: string[];
  selectedFields?: string[];
  setSelectedFields: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ style, fields = [], selectedFields = [], setSelectedFields }) => {
  const [searchText, setSearchText] = useState("");
  const domRef = React.useRef<HTMLDivElement>(null);
  const onRemove = (field: string) => {
    setSelectedFields((fields) => fields.filter((f) => f !== field));
  };
  const onSelect = (field: string) => {
    setSelectedFields((fields) => [...fields, field]);
  };
  const unselected = useMemo(() => {
    return fields
      .filter((f) => {
        const re = new RegExp(searchText, "i");
        return re.test(f);
      })
      .filter((f) => !selectedFields.includes(f));
  }, [selectedFields, fields, searchText]);
  const items = useMemo(() => {
    const i = [
      {
        key: "selected",
        label: Title("Selected fields", selectedFields.length),
        children: (
          <FieldsList
            remove={true}
            onSelect={onRemove}
            fields={selectedFields}
          />
        ),
      },
      {
        key: "fields",
        label: Title("Available fields", unselected.length),
        children: <FieldsList onSelect={onSelect} fields={unselected} />,
      },
    ];
    if (selectedFields.length === 0) {
      return [i[1]];
    }
    return i;
  }, [selectedFields, unselected, fields]);
  useEffect(() => {
    if (!domRef.current) return;
    const height = domRef.current.parentElement?.offsetHeight;
    const width = domRef.current.parentElement?.offsetWidth;
  }, [domRef]);
  return (
    <div ref={domRef} style={style}>
      <SearchField
        setValue={setSearchText}
        value={searchText}
        fields={fields}></SearchField>
      <div style={{ marginTop: 5, height: `100%`, overflow: "scroll" }}>
        <Collapse
          size="small"
          bordered={false}
          defaultActiveKey={["selected", "fields"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          items={items}
        />
      </div>
    </div>
  );
};

export default AvailableFields;
