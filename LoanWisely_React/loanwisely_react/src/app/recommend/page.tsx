import { Suspense } from "react";

import RecommendResultPage from "@/components/recommend/RecommendResultPage";

const RecommendPage = () => (
  <Suspense fallback={null}>
    <RecommendResultPage />
  </Suspense>
);

export default RecommendPage;
