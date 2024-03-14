import React, { useEffect, useMemo } from "react";
import Container from "./container";
import { useSelector } from "react-redux";
import { apiClient } from "../../api/client";
import { SuperDatePicker } from "../../store/date";
import { Line, Pair } from "./model";
import ReactECharts from "echarts-for-react";

function query(start: string, end: string) {
  const query = {
    aggs: {
      "0": {
        terms: {
          field: "destination.ip",
          order: {
            "1": "desc",
          },
          size: 10,
          shard_size: 25,
        },
        aggs: {
          "1": {
            value_count: {
              field: "event.signature",
            },
          },
        },
      },
    },
    size: 0,
    fields: [],
    script_fields: {},
    stored_fields: ["*"],
    runtime_mappings: {},
    _source: {
      excludes: [],
    },
    query: {
      bool: {
        must: [],
        filter: [
          {
            bool: {
              should: [
                {
                  bool: {
                    should: [
                      {
                        exists: {
                          field: "fortinet.firewall.attack",
                        },
                      },
                    ],
                    minimum_should_match: 1,
                  },
                },
                {
                  bool: {
                    should: [
                      {
                        exists: {
                          field: "panw.panos.threat.name",
                        },
                      },
                    ],
                    minimum_should_match: 1,
                  },
                },
              ],
              minimum_should_match: 1,
            },
          },
          {
            match_phrase: {
              "observer.type": "firewall",
            },
          },
          {
            range: {
              "@timestamp": {
                format: "strict_date_optional_time",
                gte: start,
                lte: end,
              },
            },
          },
        ],
        should: [],
        must_not: [],
      },
    },
  };
  return apiClient.searchWithIndex("*:*", query);
}

const TopTanVictimHost: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [pairs, setPairs] = React.useState<Pair<string, number>[]>([]);
  const date: SuperDatePicker = useSelector((state: any) => state.date);
  useEffect(() => {
    setIsLoading(true);
    query(date.start, date.end).then((res: any) => {
      const buckets = res["aggregations"]["0"]["buckets"];
      setIsLoading(false);
      if (buckets.length === 0) {
        setPairs([]);
        return;
      }
      const pairs = buckets.map((bucket: any) => {
        return {
          left: bucket["key"],
          right: bucket["1"]["value"],
        } as Pair<string, number>;
      });
      setPairs(pairs);
    });
  }, [date]);
  const option = useMemo(() => {
    return {
      legend: {},
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: "category",
        data: pairs.map((pair) => pair.left),
      },
      series: [
        {
          type: "bar",
          data: pairs.map((pair) => pair.right),
        },
      ],
    };
  }, [pairs]);
  return (
    <Container loading={isLoading} title={"Top 10 Victim Host"}>
      <ReactECharts option={option} notMerge={true} lazyUpdate={true} />
    </Container>
  );
};

export default TopTanVictimHost;
