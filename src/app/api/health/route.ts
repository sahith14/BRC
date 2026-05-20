import { NextResponse } from "next/server";

// Lightweight liveness probe.
// - Used by Fly.io's [http_service] auto-stop machinery.
// - Used by the static frontend to detect whether a backend is reachable.
// - Intentionally does NOT touch MongoDB so a transient DB outage doesn't
//   take the whole node down; check /api/health/ready (future) for that.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "brc-backend",
    time: new Date().toISOString(),
  });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
