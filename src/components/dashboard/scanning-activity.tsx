import React, { useEffect, useMemo } from "react";
import Container from "./container";
import { useSelector } from "react-redux";
import { apiClient } from "../../api/client";
import { SuperDatePicker } from "../../store/date";
import { Pair } from "./model";
import ReactECharts from "echarts-for-react";

function query(start: string, end: string) {
  const query = {
    aggs: {
      "0": {
        terms: {
          field: "source.ip",
          order: {
            "1": "desc",
          },
          size: 5,
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
    fields: [
      {
        field: "@timestamp",
        format: "date_time",
      },
      {
        field: "alert_time",
        format: "date_time",
      },
      {
        field: "anomaly.start",
        format: "date_time",
      },
      {
        field: "client.process.start",
        format: "date_time",
      },
      {
        field: "code_signature.timestamp",
        format: "date_time",
      },
      {
        field: "completed_at",
        format: "date_time",
      },
      {
        field: "conversation.last_updated",
        format: "date_time",
      },
      {
        field: "created_at",
        format: "date_time",
      },
      {
        field: "date",
        format: "date_time",
      },
      {
        field: "date_nanos",
        format: "strict_date_time",
      },
      {
        field: "dll.code_signature.timestamp",
        format: "date_time",
      },
      {
        field: "elf.creation_date",
        format: "date_time",
      },
      {
        field: "email.delivery_timestamp",
        format: "date_time",
      },
      {
        field: "email.origination_timestamp",
        format: "date_time",
      },
      {
        field: "endtime",
        format: "date_time",
      },
      {
        field: "enrich_executing_policy_stats.task.start_time_in_millis",
        format: "date_time",
      },
      {
        field: "event.ingested",
        format: "date_time",
      },
      {
        field: "expiration",
        format: "date_time",
      },
      {
        field: "file.accessed",
        format: "date_time",
      },
      {
        field: "file.code_signature.timestamp",
        format: "date_time",
      },
      {
        field: "file.created",
        format: "date_time",
      },
      {
        field: "file.ctime",
        format: "date_time",
      },
      {
        field: "file.elf.creation_date",
        format: "date_time",
      },
      {
        field: "file.mtime",
        format: "date_time",
      },
      {
        field: "file.x509.not_after",
        format: "date_time",
      },
      {
        field: "file.x509.not_before",
        format: "date_time",
      },
      {
        field: "job_stats.data_counts.earliest_record_timestamp",
        format: "date_time",
      },
      {
        field: "job_stats.data_counts.latest_record_timestamp",
        format: "date_time",
      },
      {
        field: "kibana.alert.anomaly_timestamp",
        format: "date_time",
      },
      {
        field: "kibana.alert.end",
        format: "date_time",
      },
      {
        field: "kibana.alert.last_detected",
        format: "date_time",
      },
      {
        field: "kibana.alert.original_event.created",
        format: "date_time",
      },
      {
        field: "kibana.alert.original_event.end",
        format: "date_time",
      },
      {
        field: "kibana.alert.original_event.ingested",
        format: "date_time",
      },
      {
        field: "kibana.alert.original_event.start",
        format: "date_time",
      },
      {
        field: "kibana.alert.original_time",
        format: "date_time",
      },
      {
        field: "kibana.alert.rule.created_at",
        format: "date_time",
      },
      {
        field: "kibana.alert.rule.updated_at",
        format: "date_time",
      },
      {
        field: "kibana.alert.start",
        format: "date_time",
      },
      {
        field: "kibana.alert.suppression.end",
        format: "date_time",
      },
      {
        field: "kibana.alert.suppression.start",
        format: "date_time",
      },
      {
        field: "kibana.alert.threshold_result.from",
        format: "date_time",
      },
      {
        field: "kibana.alert.top_influencers.timestamp",
        format: "date_time",
      },
      {
        field: "kibana.alert.top_records.timestamp",
        format: "date_time",
      },
      {
        field: "kibana_stats.timestamp",
        format: "date_time",
      },
      {
        field: "lastTime",
        format: "date_time",
      },
      {
        field: "logstash_stats.timestamp",
        format: "date_time",
      },
      {
        field: "match_time",
        format: "date_time",
      },
      {
        field: "messages.@timestamp",
        format: "date_time",
      },
      {
        field: "package.installed",
        format: "date_time",
      },
      {
        field: "panw.panos.certificate.not_after",
        format: "date_time",
      },
      {
        field: "panw.panos.certificate.not_before",
        format: "date_time",
      },
      {
        field: "panw.panos.factorcompletiontime",
        format: "date_time",
      },
      {
        field: "panw.panos.generated_time",
        format: "date_time",
      },
      {
        field: "panw.panos.received_time",
        format: "date_time",
      },
      {
        field: "panw.panos.start_time",
        format: "date_time",
      },
      {
        field: "parsed_fields.endtime",
        format: "date_time",
      },
      {
        field: "parsed_fields.timestamp",
        format: "date_time",
      },
      {
        field: "process.code_signature.timestamp",
        format: "date_time",
      },
      {
        field: "process.cpu.start_time",
        format: "date_time",
      },
      {
        field: "process.elf.creation_date",
        format: "date_time",
      },
      {
        field: "process.end",
        format: "date_time",
      },
      {
        field: "process.entry_leader.parent.session_leader.start",
        format: "date_time",
      },
      {
        field: "process.entry_leader.parent.start",
        format: "date_time",
      },
      {
        field: "process.entry_leader.start",
        format: "date_time",
      },
      {
        field: "process.group_leader.start",
        format: "date_time",
      },
      {
        field: "process.parent.code_signature.timestamp",
        format: "date_time",
      },
      {
        field: "process.parent.elf.creation_date",
        format: "date_time",
      },
      {
        field: "process.parent.end",
        format: "date_time",
      },
      {
        field: "process.parent.group_leader.start",
        format: "date_time",
      },
      {
        field: "process.parent.start",
        format: "date_time",
      },
      {
        field: "process.session_leader.parent.session_leader.start",
        format: "date_time",
      },
      {
        field: "process.session_leader.parent.start",
        format: "date_time",
      },
      {
        field: "process.session_leader.start",
        format: "date_time",
      },
      {
        field: "process.start",
        format: "date_time",
      },
      {
        field: "server.process.start",
        format: "date_time",
      },
      {
        field: "signal.original_event.created",
        format: "date_time",
      },
      {
        field: "signal.original_event.end",
        format: "date_time",
      },
      {
        field: "signal.original_event.start",
        format: "date_time",
      },
      {
        field: "signal.original_time",
        format: "date_time",
      },
      {
        field: "signal.rule.created_at",
        format: "date_time",
      },
      {
        field: "signal.rule.updated_at",
        format: "date_time",
      },
      {
        field: "signal.threshold_result.from",
        format: "date_time",
      },
      {
        field: "source_node.timestamp",
        format: "date_time",
      },
      {
        field: "started_at",
        format: "date_time",
      },
      {
        field: "starttime",
        format: "date_time",
      },
      {
        field: "system.process.cpu.start_time",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.file.accessed",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.file.code_signature.timestamp",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.file.created",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.file.ctime",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.file.elf.creation_date",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.file.mtime",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.file.x509.not_after",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.file.x509.not_before",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.first_seen",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.last_seen",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.modified_at",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.x509.not_after",
        format: "date_time",
      },
      {
        field: "threat.enrichments.indicator.x509.not_before",
        format: "date_time",
      },
      {
        field: "threat.enrichments.matched.occurred",
        format: "date_time",
      },
      {
        field: "threat.indicator.file.accessed",
        format: "date_time",
      },
      {
        field: "threat.indicator.file.code_signature.timestamp",
        format: "date_time",
      },
      {
        field: "threat.indicator.file.created",
        format: "date_time",
      },
      {
        field: "threat.indicator.file.ctime",
        format: "date_time",
      },
      {
        field: "threat.indicator.file.elf.creation_date",
        format: "date_time",
      },
      {
        field: "threat.indicator.file.mtime",
        format: "date_time",
      },
      {
        field: "threat.indicator.file.x509.not_after",
        format: "date_time",
      },
      {
        field: "threat.indicator.file.x509.not_before",
        format: "date_time",
      },
      {
        field: "threat.indicator.first_seen",
        format: "date_time",
      },
      {
        field: "threat.indicator.last_seen",
        format: "date_time",
      },
      {
        field: "threat.indicator.modified_at",
        format: "date_time",
      },
      {
        field: "threat.indicator.x509.not_after",
        format: "date_time",
      },
      {
        field: "threat.indicator.x509.not_before",
        format: "date_time",
      },
      {
        field: "tls.client.not_after",
        format: "date_time",
      },
      {
        field: "tls.client.not_before",
        format: "date_time",
      },
      {
        field: "tls.client.x509.not_after",
        format: "date_time",
      },
      {
        field: "tls.client.x509.not_before",
        format: "date_time",
      },
      {
        field: "tls.server.not_after",
        format: "date_time",
      },
      {
        field: "tls.server.not_before",
        format: "date_time",
      },
      {
        field: "tls.server.x509.not_after",
        format: "date_time",
      },
      {
        field: "tls.server.x509.not_before",
        format: "date_time",
      },
      {
        field: "until",
        format: "date_time",
      },
      {
        field: "updated_at",
        format: "date_time",
      },
      {
        field: "x509.not_after",
        format: "date_time",
      },
      {
        field: "x509.not_before",
        format: "date_time",
      },
    ],
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

const ScanningActivity: React.FC = () => {
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
    <Container
      loading={isLoading}
      title={"Scanning Activity (Many Attacks from Same Source)"}>
      <ReactECharts option={option} notMerge={true} lazyUpdate={true} />
    </Container>
  );
};

export default ScanningActivity;
