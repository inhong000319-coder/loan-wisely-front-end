// 활성 메타데이터 버전 조회 BFF 라우트
import { NextResponse } from "next/server";

import { env } from "@/infra/env";
import { FetchError, fetcher } from "@/infra/fetcher";

const buildTargetUrl = (): string => {
  const base = env.backendUrl.replace(/\/+$/, "");
  return `${base}/api/metadata/credit-dictionary/versions/active`;
};

const respond = (body: unknown, status: number): NextResponse => {
  if (body === null || body === undefined) {
    return new NextResponse(null, { status });
  }
  if (typeof body === "string") {
    return new NextResponse(body, { status });
  }
  return NextResponse.json(body, { status });
};

export const GET = async (): Promise<NextResponse> => {
  if (env.backendUrl === "") {
    return NextResponse.json({ message: "BACKEND_URL is not configured." }, { status: 500 });
  }

  const targetUrl = buildTargetUrl();
  const headers = env.backendApiKey ? { "X-API-KEY": env.backendApiKey } : undefined;

  try {
    const data = await fetcher<unknown>(targetUrl, { method: "GET", headers });
    return respond(data, 200);
  } catch (error) {
    if (error instanceof FetchError) {
      return respond(error.body, error.status);
    }
    return respond({ message: "Proxy request failed." }, 502);
  }
};
