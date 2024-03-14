export class Result {
  hits: Hits;
  timedOut: boolean;
  took: number;
  shards: Shards;
  constructor(result: any) {
    this.hits = new Hits(result.hits);
    this.timedOut = result.timed_out;
    this.took = result.took;
    this.shards = new Shards(result._shards);
  }
}

export class Hits {
  hits: Hit[];
  maxScore: number;
  total: { relation: string; value: number };
  constructor(hits: any) {
    if (!hits) {
      this.hits = [];
      this.maxScore = 0;
      this.total = { relation: "eq", value: 0 };
      return;
    }
    this.maxScore = hits.max_score;
    this.hits = hits.hits.map((hit: any) => {
      return new Hit(hit);
    });
    this.total = hits.total;
  }
}

export class Shards {
  failed: number;
  skipped: number;
  successful: number;
  total: number;
  constructor(shards: any) {
    this.failed = shards.failed;
    this.skipped = shards.skipped;
    this.successful = shards.successful;
    this.total = shards.total;
  }
}

export class Hit {
  _id: string;
  _index: string;
  _score: number;
  _source: Source;
  get timestamp(): Date | undefined {
    return this._source.timestamp;
  }
  constructor(hits: any) {
    this._id = hits._id;
    this._index = hits._index;
    this._score = hits._score;
    this._source = new Source(hits._source);
  }
}

export class Source {
  fields: Map<string, any>;
  constructor(source: any) {
    this.fields = new Map();
    Object.keys(source).forEach((key) => {
      const value = source[key];
      switch (typeof value) {
        case "object":
          if (Array.isArray(value)) {
            this.fields.set(key, value);
          } else {
            this.fields.set(key, new Source(value));
          }
          break;
        default:
          this.fields.set(key, value);
          break;
      }
    });
  }
  get timestamp(): Date | undefined {
    const timestamp = this.getValue("@timestamp");
    if (!timestamp) {
      return undefined;
    }
    return new Date(timestamp);
  }
  private pathRec(fields: Map<string, any>): string[][] {
    if (fields.size === 0) {
      return [];
    }
    let result: string[][] = [];
    fields.forEach((value, key) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        result.push(
          ...this.pathRec((value as Source).fields).map((k) => [key, ...k])
        );
      } else {
        result.push([key]);
      }
    });
    return result;
  }
  getPaths(): Path[] {
    return this.pathRec(this.fields).map((path) => new Path(path));
  }
  getJsonPaths(): string[] {
    return [];
  }
  getValue(paths: string | string[] | Path): any {
    if (paths instanceof Path) {
      return this.getValue(paths.path);
    }
    if (typeof paths === "string") {
      return this.fields.get(paths);
    }
    if (!Array.isArray(paths) || paths.length === 0) {
      return undefined;
    }
    const [head, tail] = paths;
    const source = this.fields.get(head);
    if (source !== 0 && !source) {
      return undefined;
    }
    if (!tail || tail.length === 0) {
      return source;
    }
    if (tail) {
      return source.getValue(tail);
    }
  }
  getDocument(): Map<string, any> {
    let result = new Map<string, any>();
    this.getPaths().forEach((path) => {
      const value = this.getValue(path);
      if (typeof value != "object") {
        result.set(path.jsonPath(), value);
      }
    });
    return result;
  }
}

export class Path {
  path: string[];
  constructor(path: string[], value?: any) {
    this.path = path;
  }
  jsonPath(): string {
    return this.path.join(".");
  }
}
