import React, { useCallback, useMemo } from "react";
import { Button, Input, DatePicker, ConfigProvider } from "antd";
import DataViewSeletion from "./data-view-selection";
import { TimeRange } from "../pages/query";
import dayjs from "dayjs";
import {
  NoUndefinedRangeValueType,
  RangeValueType,
} from "rc-picker/lib/PickerInput/RangePicker";
import { useSelector } from "react-redux";
const { RangePicker } = DatePicker;

const SearchBar: React.FC<{
  ref?: React.RefObject<HTMLDivElement>;
  onSearch: (query: any) => void;
  index: string;
  setIndex: (index: string) => void;
  timeRange: TimeRange;
  setTimeRange(timeRange: TimeRange): void;
}> = ({ onSearch, index, setIndex, setTimeRange, timeRange, ref }) => {
  const loading = useSelector((state: any) => state.loading.loading) as boolean;
  const onChange = useCallback(
    (dates: NoUndefinedRangeValueType<dayjs.Dayjs>, _: [string, string]) => {
      if (!dates) return;
      let start = new Date();
      let end = new Date();
      if (dates[0]) {
        start = new Date(dates[0].unix() * 1000);
      }
      if (dates[1]) {
        end = new Date(dates[1].unix() * 1000);
      }
      setTimeRange({ start: start, end });
    },
    [timeRange]
  );
  const days = useMemo<RangeValueType<dayjs.Dayjs>>(() => {
    let start: dayjs.Dayjs | undefined;
    let end: dayjs.Dayjs | undefined;
    if (timeRange.start) {
      start = dayjs(timeRange.start);
    }
    if (timeRange.end) {
      end = dayjs(timeRange.end);
    }
    return [start, end];
  }, [timeRange]);
  return (
    <div ref={ref} style={{ display: "flex", padding: 5 }}>
      <DataViewSeletion search={index} setSearch={setIndex}></DataViewSeletion>
      <Input style={{ flex: 1, width: 100, flexGrow: 2 }} placeholder="" />
      <ConfigProvider>
        <RangePicker
          value={days}
          onChange={onChange}
          showTime
          style={{ marginRight: 5 }}
        />
      </ConfigProvider>
      <Button
        loading={loading}
        style={{}}
        type="primary"
        onClick={() => {
          let query = {
            query: {
              range: {
                "@timestamp": {
                  gte: timeRange.start.toISOString(),
                  lte: timeRange.end.toISOString(),
                },
              },
            },
          } as any;
          onSearch(query);
        }}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
