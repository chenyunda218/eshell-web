import { apiClient } from "../api/client";
import { SuperDatePicker } from "../store/date";
import { mixinTimeRange } from "./object";

export function query(dsl: any, date: SuperDatePicker) {
  return apiClient.searchWithIndex("*:*", mixinTimeRange(dsl, date));
}