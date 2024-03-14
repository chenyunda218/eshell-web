import React from "react";
import SearchBar from "../../components/search-bar";
import SearchContent from "../../components/search-content";
import { apiClient } from "../../api/client";
import { Result, Path, Hits } from "../../models/Result";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loading";

export interface TimeRange {
  start: Date;
  end: Date;
}

export default function Query() {
  const dispatch = useDispatch();
  const [result, setResult] = React.useState<Result>();
  const [timeRange, setTimeRange] = React.useState<TimeRange>({
    start: new Date(Date.now() - 60 * 15 * 1000),
    end: new Date(Date.now()),
  });
  const [index, setIndex] = React.useState<string>("*:*");
  const availablePaths = React.useMemo(() => {
    let pathsMap = new Map<string, Path>();
    result?.hits.hits.forEach((hit) => {
      hit._source.getPaths().forEach((path) => {
        pathsMap.set(path.jsonPath(), path);
      });
    });
    let pathsArray = Array<Path>();
    pathsMap.forEach((path) => {
      pathsArray.push(path);
    });
    return pathsArray;
  }, [result]);
  return (
    <div style={{ height: `100%` }}>
      <SearchBar
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        index={index}
        setIndex={setIndex}
        onSearch={async (query: any) => {
          dispatch(startLoading());
          apiClient.aggregations(index, timeRange, "day").then((res: any) => {
            dispatch(stopLoading());
          });
          dispatch(startLoading());
          const resp = await apiClient.searchWithIndex(index, query);
          const result = new Result(resp);
          dispatch(stopLoading());
          setResult(result);
        }}></SearchBar>
      <SearchContent
        hits={result ? result.hits : new Hits(null)}
        availablePaths={availablePaths}></SearchContent>
    </div>
  );
}
