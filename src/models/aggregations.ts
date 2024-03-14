export class Aggregations {
  histogram: Histogram;
  constructor(raw: any) {
    this.histogram = new Histogram(raw.aggregations.histogram);
  }
  total(): number {
    return this.histogram.total();
  }
}

export class Histogram {
  buckets: Bucket[];
  constructor(histogram: any) {
    this.buckets = histogram.buckets.map((bucket: any) => {
      return new Bucket(bucket);
    });
  }
  total(): number {
    return this.buckets.reduce((acc, bucket) => {
      return acc + bucket.docCount;
    }, 0);
  }
}

export class Bucket {
  key: number;
  keyAsString: string;
  docCount: number;
  constructor(bucket: any) {
    this.key = bucket.key;
    this.keyAsString = bucket.key_as_string;
    this.docCount = bucket.doc_count;
  }
}
