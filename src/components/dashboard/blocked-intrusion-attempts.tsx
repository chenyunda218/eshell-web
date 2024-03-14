import React, { useEffect, useState } from "react";
import Container from "./container";
import Decimal from "./decimal";
import { apiClient } from "../../api/client";
import { SuperDatePicker } from "../../store/date";
import { useSelector } from "react-redux";

function query(start: string, end: string) {
  const query = {
    "aggs": {},
    "size": 0,
    "fields": [
      {
        "field": "@timestamp",
        "format": "date_time"
      },
      {
        "field": "alert_time",
        "format": "date_time"
      },
      {
        "field": "anomaly.start",
        "format": "date_time"
      },
      {
        "field": "client.process.start",
        "format": "date_time"
      },
      {
        "field": "code_signature.timestamp",
        "format": "date_time"
      },
      {
        "field": "completed_at",
        "format": "date_time"
      },
      {
        "field": "conversation.last_updated",
        "format": "date_time"
      },
      {
        "field": "created_at",
        "format": "date_time"
      },
      {
        "field": "date",
        "format": "date_time"
      },
      {
        "field": "date_nanos",
        "format": "strict_date_time"
      },
      {
        "field": "dll.code_signature.timestamp",
        "format": "date_time"
      },
      {
        "field": "elasticsearch.cluster.stats.license.expiry_date",
        "format": "date_time"
      },
      {
        "field": "elasticsearch.cluster.stats.license.issue_date",
        "format": "date_time"
      },
      {
        "field": "elf.creation_date",
        "format": "date_time"
      },
      {
        "field": "email.delivery_timestamp",
        "format": "date_time"
      },
      {
        "field": "email.origination_timestamp",
        "format": "date_time"
      },
      {
        "field": "endtime",
        "format": "date_time"
      },
      {
        "field": "enrich_executing_policy_stats.task.start_time_in_millis",
        "format": "date_time"
      },
      {
        "field": "event.ingested",
        "format": "date_time"
      },
      {
        "field": "expiration",
        "format": "date_time"
      },
      {
        "field": "file.accessed",
        "format": "date_time"
      },
      {
        "field": "file.code_signature.timestamp",
        "format": "date_time"
      },
      {
        "field": "file.created",
        "format": "date_time"
      },
      {
        "field": "file.ctime",
        "format": "date_time"
      },
      {
        "field": "file.elf.creation_date",
        "format": "date_time"
      },
      {
        "field": "file.mtime",
        "format": "date_time"
      },
      {
        "field": "file.x509.not_after",
        "format": "date_time"
      },
      {
        "field": "file.x509.not_before",
        "format": "date_time"
      },
      {
        "field": "job_stats.data_counts.earliest_record_timestamp",
        "format": "date_time"
      },
      {
        "field": "job_stats.data_counts.latest_record_timestamp",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.anomaly_timestamp",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.end",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.last_detected",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.original_event.created",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.original_event.end",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.original_event.ingested",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.original_event.start",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.original_time",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.rule.created_at",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.rule.updated_at",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.start",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.suppression.end",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.suppression.start",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.threshold_result.from",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.top_influencers.timestamp",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.top_records.timestamp",
        "format": "date_time"
      },
      {
        "field": "kibana.alert.workflow_status_updated_at",
        "format": "date_time"
      },
      {
        "field": "kibana_stats.timestamp",
        "format": "date_time"
      },
      {
        "field": "lastTime",
        "format": "date_time"
      },
      {
        "field": "logstash_stats.timestamp",
        "format": "date_time"
      },
      {
        "field": "match_time",
        "format": "date_time"
      },
      {
        "field": "messages.@timestamp",
        "format": "date_time"
      },
      {
        "field": "package.installed",
        "format": "date_time"
      },
      {
        "field": "panw.panos.certificate.not_after",
        "format": "date_time"
      },
      {
        "field": "panw.panos.certificate.not_before",
        "format": "date_time"
      },
      {
        "field": "panw.panos.generated_time",
        "format": "date_time"
      },
      {
        "field": "parsed_fields.timestamp",
        "format": "date_time"
      },
      {
        "field": "process.code_signature.timestamp",
        "format": "date_time"
      },
      {
        "field": "process.cpu.start_time",
        "format": "date_time"
      },
      {
        "field": "process.elf.creation_date",
        "format": "date_time"
      },
      {
        "field": "process.end",
        "format": "date_time"
      },
      {
        "field": "process.entry_leader.parent.session_leader.start",
        "format": "date_time"
      },
      {
        "field": "process.entry_leader.parent.start",
        "format": "date_time"
      },
      {
        "field": "process.entry_leader.start",
        "format": "date_time"
      },
      {
        "field": "process.group_leader.start",
        "format": "date_time"
      },
      {
        "field": "process.parent.code_signature.timestamp",
        "format": "date_time"
      },
      {
        "field": "process.parent.elf.creation_date",
        "format": "date_time"
      },
      {
        "field": "process.parent.end",
        "format": "date_time"
      },
      {
        "field": "process.parent.group_leader.start",
        "format": "date_time"
      },
      {
        "field": "process.parent.start",
        "format": "date_time"
      },
      {
        "field": "process.session_leader.parent.session_leader.start",
        "format": "date_time"
      },
      {
        "field": "process.session_leader.parent.start",
        "format": "date_time"
      },
      {
        "field": "process.session_leader.start",
        "format": "date_time"
      },
      {
        "field": "process.start",
        "format": "date_time"
      },
      {
        "field": "server.process.start",
        "format": "date_time"
      },
      {
        "field": "signal.original_event.created",
        "format": "date_time"
      },
      {
        "field": "signal.original_event.end",
        "format": "date_time"
      },
      {
        "field": "signal.original_event.start",
        "format": "date_time"
      },
      {
        "field": "signal.original_time",
        "format": "date_time"
      },
      {
        "field": "signal.rule.created_at",
        "format": "date_time"
      },
      {
        "field": "signal.rule.updated_at",
        "format": "date_time"
      },
      {
        "field": "signal.threshold_result.from",
        "format": "date_time"
      },
      {
        "field": "source_node.timestamp",
        "format": "date_time"
      },
      {
        "field": "started_at",
        "format": "date_time"
      },
      {
        "field": "starttime",
        "format": "date_time"
      },
      {
        "field": "system.process.cpu.start_time",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.file.accessed",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.file.code_signature.timestamp",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.file.created",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.file.ctime",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.file.elf.creation_date",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.file.mtime",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.file.x509.not_after",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.file.x509.not_before",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.first_seen",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.last_seen",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.modified_at",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.x509.not_after",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.indicator.x509.not_before",
        "format": "date_time"
      },
      {
        "field": "threat.enrichments.matched.occurred",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.file.accessed",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.file.code_signature.timestamp",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.file.created",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.file.ctime",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.file.elf.creation_date",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.file.mtime",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.file.x509.not_after",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.file.x509.not_before",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.first_seen",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.last_seen",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.modified_at",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.x509.not_after",
        "format": "date_time"
      },
      {
        "field": "threat.indicator.x509.not_before",
        "format": "date_time"
      },
      {
        "field": "tls.client.not_after",
        "format": "date_time"
      },
      {
        "field": "tls.client.not_before",
        "format": "date_time"
      },
      {
        "field": "tls.client.x509.not_after",
        "format": "date_time"
      },
      {
        "field": "tls.client.x509.not_before",
        "format": "date_time"
      },
      {
        "field": "tls.server.not_after",
        "format": "date_time"
      },
      {
        "field": "tls.server.not_before",
        "format": "date_time"
      },
      {
        "field": "tls.server.x509.not_after",
        "format": "date_time"
      },
      {
        "field": "tls.server.x509.not_before",
        "format": "date_time"
      },
      {
        "field": "until",
        "format": "date_time"
      },
      {
        "field": "updated_at",
        "format": "date_time"
      },
      {
        "field": "x509.not_after",
        "format": "date_time"
      },
      {
        "field": "x509.not_before",
        "format": "date_time"
      }
    ],
    "script_fields": {},
    "stored_fields": [
      "*"
    ],
    "runtime_mappings": {},
    "_source": {
      "excludes": []
    },
    "query": {
      "bool": {
        "must": [],
        "filter": [
          {
            "bool": {
              "should": [
                {
                  "bool": {
                    "filter": [
                      {
                        "bool": {
                          "should": [
                            {
                              "exists": {
                                "field": "fortinet.firewall.attack"
                              }
                            }
                          ],
                          "minimum_should_match": 1
                        }
                      },
                      {
                        "bool": {
                          "should": [
                            {
                              "bool": {
                                "should": [
                                  {
                                    "term": {
                                      "fortinet.firewall.action": {
                                        "value": "dropped"
                                      }
                                    }
                                  }
                                ],
                                "minimum_should_match": 1
                              }
                            },
                            {
                              "bool": {
                                "should": [
                                  {
                                    "wildcard": {
                                      "fortinet.firewall.action": {
                                        "value": "block*"
                                      }
                                    }
                                  }
                                ],
                                "minimum_should_match": 1
                              }
                            },
                            {
                              "bool": {
                                "should": [
                                  {
                                    "term": {
                                      "fortinet.firewall.action": {
                                        "value": "blocked"
                                      }
                                    }
                                  }
                                ],
                                "minimum_should_match": 1
                              }
                            }
                          ],
                          "minimum_should_match": 1
                        }
                      }
                    ]
                  }
                },
                {
                  "bool": {
                    "filter": [
                      {
                        "bool": {
                          "should": [
                            {
                              "exists": {
                                "field": "panw.panos.threat.name"
                              }
                            }
                          ],
                          "minimum_should_match": 1
                        }
                      },
                      {
                        "bool": {
                          "should": [
                            {
                              "term": {
                                "event.outcome": {
                                  "value": "failure"
                                }
                              }
                            }
                          ],
                          "minimum_should_match": 1
                        }
                      }
                    ]
                  }
                }
              ],
              "minimum_should_match": 1
            }
          },
          {
            "match_phrase": {
              "data_stream.namespace": "ssm"
            }
          },
          {
            "range": {
              "@timestamp": {
                "format": "strict_date_optional_time",
                "gte": "2024-02-29T16:00:00.000Z",
                "lte": "2024-03-08T15:59:59.999Z"
              }
            }
          }
        ],
        "should": [],
        "must_not": []
      }
    }
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
      setValue(res.data.hits.total.value);
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
      <Decimal style={{}} title="Blocked Intrusion Attempts" value={value} />
    </Container>
  );
};

export default AllowedIntrusionAttempts;
