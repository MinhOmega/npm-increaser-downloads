interface NpmsioMetadata {
  version: string;
}

interface NpmsioCollected {
  metadata: NpmsioMetadata;
}

interface NpmsioDetail {
  popularity: number;
}

interface NpmsioScore {
  final: number;
  detail: NpmsioDetail;
}

export interface NpmsioResponse {
  analyzedAt: string;
  collected: NpmsioCollected;
  score: NpmsioScore;
}