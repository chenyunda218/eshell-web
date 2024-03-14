import React, { useEffect, useState } from "react";
import Container from "./container";
import Decimal from "./decimal";
import { apiClient } from "../../api/client";
import { SuperDatePicker } from "../../store/date";
import { useSelector } from "react-redux";

function query(start: string, end: string) {
  const query = {
    track_total_hits: true,
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
                  term: {
                    "log.level": "low",
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

const LowServerityAlerts: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const date: SuperDatePicker = useSelector((state: any) => state.date);
  const [value, setValue] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    query(date.start, date.end).then((res: any) => {
      setValue(res.hits.total.value);
      setIsLoading(false);
    });
  }, [date]);

  return (
    <Container
      style={{
        borderRadius: 5,
        padding: 5,
        backgroundColor: "#479080",
        margin: 5,
      }}
      loading={isLoading}>
      <Decimal title="Low Severity Alerts" value={value} />
    </Container>
  );
};

export default LowServerityAlerts;
