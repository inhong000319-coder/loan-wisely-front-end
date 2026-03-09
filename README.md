# LoanWisely React Frontend

사용자용 웹 프론트엔드입니다.  
로그인/회원가입/동의/상품 조회/추천 요청/추천 상세 조회를 제공합니다.

## 핵심 역할
- 사용자 전용 온보딩 및 대시보드 화면 제공
- 추천 플로우(설문 → 추천요청 → 결과/설명) 구현
- 서버 API 라우트 기반 BFF 형태 프록시로 백엔드 호출 분리
- React Query 기반 캐시/상태 관리
- 타입 기반 API 연동(src/api/*, src/types/*)

## 아키텍처
- Next.js App Router
- React 19 + TypeScript
- TanStack Query + Hook 기반 데이터 계층 분리
- 서버 API 라우트(/app/api/*)를 통해 Spring 엔드포인트 프록시
- 환경 분리 가능한 BACKEND_URL, 타임아웃 설정
