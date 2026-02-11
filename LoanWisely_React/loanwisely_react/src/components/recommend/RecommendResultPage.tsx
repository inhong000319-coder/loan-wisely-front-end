"use client";
// 추천 결과 화면

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import AppHeader from "@/components/common/AppHeader";
import ActionSection from "@/components/recommend/sections/ActionSection";
import ProductGridSection from "@/components/recommend/sections/ProductGridSection";
import RecommendHeroSection from "@/components/recommend/sections/RecommendHeroSection";
import RecommendationListSection from "@/components/recommend/sections/RecommendationListSection";
import RiskSection from "@/components/recommend/sections/RiskSection";
import SimulationSection from "@/components/recommend/sections/SimulationSection";
import SummarySection from "@/components/recommend/sections/SummarySection";

import { getAccessToken } from "@/infra/auth";
import { useRecommendResult } from "@/hooks/useRecommendResult";
import { useRecommendationList } from "@/hooks/useRecommendationList";
import { useRecommendationExplain } from "@/hooks/useRecommendationExplain";

const splitSummary = (summary: string): string[] => {
  const parts = summary.split(/[\n•]/).map((item) => item.trim()).filter(Boolean);
  if (parts.length >= 3) {
    return parts.slice(0, 3);
  }
  if (parts.length > 0) {
    return parts;
  }
  return ["요약 데이터가 없습니다."];
};

const RecommendResultPage = () => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [activeVersion, setActiveVersion] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const recommendationId = searchParams.get("id");
  const { data, isLoading } = useRecommendResult(recommendationId);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setAccessToken(getAccessToken());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const loadActiveVersion = async () => {
      try {
        const response = await fetch("/api/metadata/credit-dictionary/versions/active");
        if (!response.ok) {
          return;
        }
        const payload = await response.json();
        const versionValue = payload?.data?.activeVersion;
        if (typeof versionValue === "number") {
          setActiveVersion(versionValue);
        }
      } catch {
        return;
      }
    };
    loadActiveVersion();
  }, []);

  const { data: listData } = useRecommendationList(0, 10, Boolean(accessToken));
  const { data: explainData } = useRecommendationExplain(recommendationId);

  const levelUsedValue = explainData?.inputLevel ?? data?.inputLevel ?? null;
  const levelUsed = levelUsedValue ? `LV${levelUsedValue}` : "LV1";
  const levelStatus =
    data?.state === "READY" ? "full" : data?.state === "BLOCKED" ? "partial" : "empty";
  const summaryText =
    data?.state === "READY"
      ? "추천 결과를 표시합니다."
      : data?.state === "BLOCKED"
        ? "추천 결과가 차단되었습니다."
        : "추천 결과가 준비되지 않았습니다.";
  const summaryItems = splitSummary(summaryText);
  if (activeVersion !== null) {
    summaryItems.push(`활성 메타 버전: ${activeVersion}`);
  }

  const explainItems = explainData?.items ?? [];
  const explainByProductId = new Map(explainItems.map((item) => [item.productId, item]));

  const items = data?.items ?? [];
  const products = items.map((item) => {
    const explainItem = explainByProductId.get(item.productId);
    const factors = explainItem?.factors ?? [];
    return {
      id: String(item.productId),
      lenderName: "기관 정보 미제공",
      productName: `상품 ${item.productId}`,
      rate: item.minRate !== null && item.minRate !== undefined ? `최소 금리 ${item.minRate}` : "금리 정보 미제공",
      limit: "한도 정보 미제공",
      reason: item.briefReason ?? "추천 사유 정보 미제공",
      suitabilityScore: item.score ?? 0,
      riskNote: "",
      estimationDetails: factors.map((factor) => ({
        factorCode: factor.factorCode,
        factorName: factor.factorName,
        factorValue: String(factor.factorValue),
      })),
    };
  });
  const hasProducts = products.length > 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <AppHeader />

        <section className="flex flex-col gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg">
          <RecommendHeroSection hasId={Boolean(recommendationId)} isLoading={isLoading} />

          <RecommendationListSection items={listData?.items ?? []} />

          <SummarySection
            summaryItems={summaryItems}
            levelUsed={levelUsed}
            levelStatus={levelStatus}
          />

          <SimulationSection
            monthlyPaymentExample="상환 시뮬레이션 정보가 없습니다."
          />

          {hasProducts ? (
            <ProductGridSection
              products={products}
              fallbackTags={[]}
              showAll={showAllProducts}
              onShowAll={() => setShowAllProducts(true)}
            />
          ) : (
            <div className="rounded-3xl border border-stone-200 bg-white px-6 py-6 text-sm text-stone-500">
              추천 가능한 상품이 없습니다.
            </div>
          )}

          <RiskSection
            riskNotes={[]}
            fallbackNote="리스크 정보가 없습니다."
          />

          <ActionSection />
        </section>
      </div>
    </main>
  );
};

export default RecommendResultPage;

