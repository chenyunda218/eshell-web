import React, { useEffect, useState } from "react";
import Container from "./container";
import Decimal from "./decimal";
import { apiClient } from "../../api/client";
import { SuperDatePicker } from "../../store/date";
import { useSelector } from "react-redux";

function query(start: string, end: string) {
  const query = {
    track_total_hits: true,
    aggs: {},
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
              filter: [
                {
                  bool: {
                    filter: [
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
                              term: {
                                "fortinet.firewall.action": "accept",
                              },
                            },
                          ],
                          minimum_should_match: 1,
                        },
                      },
                    ],
                  },
                },
                {
                  bool: {
                    filter: [
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
                      {
                        bool: {
                          should: [
                            {
                              term: {
                                "event.outcome": "success",
                              },
                            },
                          ],
                          minimum_should_match: 1,
                        },
                      },
                    ],
                  },
                },
              ],
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

const AllowedIntrusionAttempts: React.FC = () => {
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
        backgroundColor: "#6db19a",
        margin: 5,
      }}
      loading={isLoading}>
      <Decimal title="Allowed Intrusion Attempts" value={value} />
    </Container>
  );
};

export default AllowedIntrusionAttempts;
