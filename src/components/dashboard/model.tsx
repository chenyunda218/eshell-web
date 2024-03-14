export interface Line {
  name: string;
  type: string;
  stack: string;
  data: number[];
}

export interface Pair<L, R> {
  left: L;
  right: R;
}
