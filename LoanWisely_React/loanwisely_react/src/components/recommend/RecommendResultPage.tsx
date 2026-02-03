"use client";

import { useSearchParams } from "next/navigation";

import AppHeader from "@/components/common/AppHeader";

import { useRecommendResult } from "@/hooks/useRecommendResult";
import { useRecommendationList } from "@/hooks/useRecommendationList";
import { useRecommendationExplain } from "@/hooks/useRecommendationExplain";

const levelBadgeClass = (status: "full" | "partial" | "empty") => {
  if (status === "full") {
    return "bg-emerald-200 text-emerald-900";
  }
  if (status === "partial") {
    return "bg-amber-200 text-amber-900";
  }
  return "bg-stone-200 text-stone-700";
};

const splitSummary = (summary: string): string[] => {
  const parts = summary.split(/[\n•]/).map((item) => item.trim()).filter(Boolean);
  if (parts.length >= 3) {
    return parts.slice(0, 3);
  }
  return [
    summary || "입력 조건을 바탕으로 추천을 구성했습니다.",
    "상환 여력을 고려한 상품을 우선 정렬했습니다.",
    "리스크 항목을 함께 확인해 주세요.",
  ];
};

const splitReasons = (reason: string): string[] =>
  reason
    .split(/[,/]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);

const RecommendResultPage = () => {
  const searchParams = useSearchParams();
  const recommendationId = searchParams.get("id");
  const { data, isLoading } = useRecommendResult(recommendationId);
  const { data: listData } = useRecommendationList();
  const { data: explainData } = useRecommendationExplain(recommendationId);

  const explain = explainData ?? data?.explain ?? {
    summary: "추천에 사용된 입력 요약이 표시됩니다.",
    levelUsed: "LV1",
    levelStatus: "empty",
    reasons: [],
    riskNotes: [],
  };

  const products = data?.products ?? [
    {
      id: "demo-1",
      lenderName: "대출사명",
      productName: "대출 상품명",
      rate: "금리 월 6.2%",
      limit: "최대 한도 500만원",
      reason: "추천 사유가 표시됩니다.",
      suitabilityScore: 78,
      riskNote: "주의사항이 표시됩니다.",
    },
    {
      id: "demo-2",
      lenderName: "대출사명",
      productName: "대출 상품명",
      rate: "금리 월 6.2%",
      limit: "최대 한도 500만원",
      reason: "추천 사유가 표시됩니다.",
      suitabilityScore: 72,
      riskNote: "주의사항이 표시됩니다.",
    },
  ];

  const detail = data?.detail ?? {
    description: "상품 상세 정보가 표시됩니다.",
    monthlyPaymentExample: "월 상환액 예시가 표시됩니다.",
    riskWarning: "고위험 조건 경고 및 승인 보장 아님 고지가 표시됩니다.",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <AppHeader />

        <section className="flex flex-col gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-stone-900">
                맞춤 추천 결과
              </h1>
              <p className="mt-2 text-sm text-stone-600">
                입력하신 정보를 바탕으로 추천된 상품 결과입니다.
              </p>
            </div>

            {!recommendationId && (
              <div className="rounded-3xl border border-stone-200 bg-stone-50 px-6 py-5 text-sm text-stone-600">
                추천 결과 ID가 없어 데모 화면을 표시합니다.
              </div>
            )}

            {isLoading && recommendationId && (
              <div className="rounded-3xl border border-stone-200 bg-stone-50 px-6 py-5 text-sm text-stone-600">
                추천 결과를 불러오는 중입니다.
              </div>
            )}

            <div className="rounded-3xl border border-stone-200 bg-white px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-stone-900">
                  내 추천 목록
                </div>
                <a
                  href="/user"
                  className="text-xs font-medium text-stone-500 hover:text-stone-700"
                >
                  맞춤추천 시작
                </a>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-stone-600">
                {(listData?.items ?? []).length === 0 ? (
                  <div>최근 추천 결과가 없습니다.</div>
                ) : (
                  listData?.items.map((item) => (
                    <a
                      key={item.id}
                      href={`/recommend?id=${item.id}`}
                      className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2"
                    >
                      <span className="text-stone-800">{item.title}</span>
                      <span className="text-xs text-stone-400">
                        {item.createdAt}
                      </span>
                    </a>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-stone-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold text-stone-900">
                  핵심 요약
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${levelBadgeClass(
                    explain.levelStatus,
                  )}`}
                >
                  {explain.levelUsed}
                </span>
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-stone-600">
                {splitSummary(explain.summary).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white px-6 py-6">
              <div className="text-sm font-semibold text-stone-900">
                상환 시뮬레이션
              </div>
              <div className="mt-4 rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-4 py-6 text-sm text-stone-500">
                {detail.monthlyPaymentExample}
              </div>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="rounded-3xl border border-stone-200 bg-white px-6 py-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-xs text-stone-500">
                        {product.lenderName}
                      </div>
                      <h2 className="text-lg font-semibold text-stone-900">
                        {product.productName}
                      </h2>
                      <div className="mt-2 text-sm text-stone-600">
                        {product.rate}
                      </div>
                      <div className="text-sm text-stone-600">
                        {product.limit}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="h-10 rounded-full border border-stone-400 px-4 text-sm font-semibold text-stone-700"
                    >
                      상세 보기
                    </button>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-stone-600">
                    <div>
                      <span className="font-semibold text-stone-800">추천 사유:</span>{" "}
                      {product.reason}
                    </div>
                    <div>
                      <span className="font-semibold text-stone-800">적합도:</span>{" "}
                      {product.suitabilityScore}점
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(splitReasons(product.reason).length > 0
                      ? splitReasons(product.reason)
                      : explain.reasons
                    ).map((tag) => (
                      <span
                        key={`${product.id}-${tag}`}
                        className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-900"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="rounded-3xl border border-stone-200 bg-stone-50/70 px-6 py-5">
              <div className="text-sm font-semibold text-stone-900">주요 리스크 요인</div>
              {(explain.riskNotes.length > 0 ? explain.riskNotes : [detail.riskWarning]).map(
                (note) => (
                  <div
                    key={note}
                    className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-xs text-amber-900"
                  >
                    {note}
                  </div>
                ),
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/user"
                className="rounded-full border border-stone-300 px-6 py-2 text-sm text-stone-700"
              >
                조건 조정
              </a>
              <a
                href="/"
                className="rounded-full bg-amber-200 px-6 py-2 text-sm font-semibold text-stone-900"
              >
                홈으로
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RecommendResultPage;

