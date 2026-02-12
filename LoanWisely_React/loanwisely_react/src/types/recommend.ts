// Recommendation API types.
export type LvUsageStatus = "full" | "partial" | "empty";

export type RecommendItemResponse = {
  productId: number;
  providerId?: number | null;
  productName?: string | null;
  score?: number | null;
  minRate?: number | null;
  briefReason?: string | null;
};

export type RecommendResponse = {
  state: "READY" | "NOT_READY" | "BLOCKED";
  inputLevel?: number | null;
  items: RecommendItemResponse[];
  warnings?: Record<string, unknown> | null;
};

export type ExplainFactor = {
  factorCode: string;
  factorName: string;
  factorValue: string | number;
};

export type RecommendExplainItem = {
  productId: number;
  score?: number | null;
  minRate?: number | null;
  factors: ExplainFactor[];
};

export type RecommendExplainResponse = {
  inputLevel: number | null;
  items: RecommendExplainItem[];
};

export type RecommendExecuteRequest = {
  versionIds: {
    profileVersionId?: string;
    lv2VersionId?: string;
    lv3VersionId?: string;
  };
  options?: Record<string, unknown>;
};

export type RecommendExecuteResponse = {
  state: "READY" | "NOT_READY" | "BLOCKED";
  inputLevel?: number | null;
  items: RecommendItemResponse[];
  warnings?: Record<string, unknown> | null;
};

export type RecommendationListItem = {
  id: string;
  title: string;
  createdAt: string;
};

export type RecommendationListResponse = {
  items: RecommendationListItem[];
  page: number;
  size: number;
  total: number;
};

export type RecommendEventRequest = {
  userId?: number;
  productId: number;
  eventType: string;
  occurredAt?: string;
};

export type RecommendEventResponse = {
  eventLogId: number;
  eventType: string;
  productId: number;
  occurredAt: string;
};


