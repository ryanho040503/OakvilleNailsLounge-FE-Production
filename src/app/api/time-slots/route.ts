import { NextResponse } from "next/server";

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function getBackendApiBaseUrl() {
  const value = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return trimTrailingSlash(value);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || Number.isNaN(new Date(date).getTime())) {
    return NextResponse.json(
      {
        success: false,
        message: "Provide a valid date query like /api/time-slots?date=2026-04-24",
      },
      { status: 400 },
    );
  }

  const apiBaseUrl = getBackendApiBaseUrl();

  if (!apiBaseUrl) {
    return NextResponse.json(
      {
        success: false,
        message: "API_BASE_URL or NEXT_PUBLIC_API_BASE_URL must be configured on the frontend deployment.",
      },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`${apiBaseUrl}/time-slots?date=${encodeURIComponent(date)}`, {
      cache: "no-store",
    });
    const payload = await response.json();

    return NextResponse.json(payload, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to load time slots.",
      },
      { status: 502 },
    );
  }
}
