// Hook to load recommendation detail.
import { useQuery } from "@tanstack/react-query";

import { fetchRecommendationDetail } from "@/api/recommendApi";
import type { RecommendResponse } from "@/types/recommend";

export const useRecommendResult = (recommendationId: string | null) =>
  useQuery<RecommendResponse>({
    queryKey: ["recommendResult", recommendationId],
    queryFn: () => fetchRecommendationDetail(recommendationId ?? ""),
    enabled: Boolean(recommendationId),
  });



