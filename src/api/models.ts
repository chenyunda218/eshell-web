export type CalendarInterval =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export interface IntrusionSignatures {
  signature: string;
  logLevel: string;
  count: number;
  index: number;
}

export interface Dashboard {
  id: string;
  name: string;
}