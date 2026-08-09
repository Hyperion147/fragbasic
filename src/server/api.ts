import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(message: string, status: number, extra?: unknown) {
  return NextResponse.json(
    { error: message, ...(extra !== undefined ? { details: extra } : {}) },
    { status },
  );
}

export function zodError(error: ZodError) {
  return jsonError("Validation failed", 400, error.flatten());
}
