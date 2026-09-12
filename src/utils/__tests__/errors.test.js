import { describe, it, expect, vi, afterEach } from "vitest";
import { getUserFriendlyError, logError } from "../errors";

describe("getUserFriendlyError", () => {
  // ── Postgres error code mapping ──────────────────────

  it("maps unique constraint violation (23505)", () => {
    const error = { code: "23505", message: "duplicate key" };
    expect(getUserFriendlyError(error)).toBe(
      "This record already exists."
    );
  });

  it("maps foreign key violation (23503)", () => {
    const error = { code: "23503", message: "foreign key" };
    expect(getUserFriendlyError(error)).toBe(
      "This record is still being used and cannot be removed."
    );
  });

  it("maps permission denied (42501)", () => {
    const error = { code: "42501" };
    expect(getUserFriendlyError(error)).toBe(
      "You do not have permission to perform this action."
    );
  });

  it("maps not found (PGRST116)", () => {
    const error = { code: "PGRST116" };
    expect(getUserFriendlyError(error)).toBe(
      "The requested record could not be found."
    );
  });

  // ── Network errors ───────────────────────────────────

  it("detects 'failed to fetch' in message", () => {
    const error = { message: "Failed to fetch" };
    expect(getUserFriendlyError(error)).toBe(
      "Network connection failed. Check your connection and try again."
    );
  });

  it("detects 'network' in message", () => {
    const error = { message: "Network error occurred" };
    expect(getUserFriendlyError(error)).toBe(
      "Network connection failed. Check your connection and try again."
    );
  });

  // ── Fallback behavior ────────────────────────────────

  it("returns default fallback for unknown errors", () => {
    const error = { code: "99999", message: "something weird" };
    expect(getUserFriendlyError(error)).toBe(
      "Something went wrong. Please try again."
    );
  });

  it("returns custom fallback when provided", () => {
    const error = { code: "99999" };
    expect(getUserFriendlyError(error, "Custom fallback")).toBe(
      "Custom fallback"
    );
  });

  it("returns fallback for null error", () => {
    expect(getUserFriendlyError(null)).toBe(
      "Something went wrong. Please try again."
    );
  });

  it("returns fallback for undefined error", () => {
    expect(getUserFriendlyError(undefined)).toBe(
      "Something went wrong. Please try again."
    );
  });

  // ── Status code fallback ─────────────────────────────

  it("uses error.status when error.code is absent", () => {
    const error = { status: "23505", message: "duplicate" };
    expect(getUserFriendlyError(error)).toBe(
      "This record already exists."
    );
  });
});

describe("logError", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls console.error in DEV mode", () => {
    vi.stubEnv("DEV", true);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    logError("test context", new Error("boom"));

    expect(spy).toHaveBeenCalledWith(
      "[test context]",
      expect.any(Error)
    );
  });

  it("does nothing in production mode", () => {
    vi.stubEnv("DEV", false);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    logError("test context", new Error("boom"));

    expect(spy).not.toHaveBeenCalled();
  });
});
