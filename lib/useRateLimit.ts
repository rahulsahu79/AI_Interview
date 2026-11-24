"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_PREFIX = "rate_limit_";

interface RateLimitState {
  isLimited: boolean;
  retryAfterSeconds: number;
  recordAttempt: () => boolean;
}

function readAttempts(storageKey: string, windowMs: number): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${storageKey}`);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const cutoff = Date.now() - windowMs;
    return parsed.filter((t): t is number => typeof t === "number" && t > cutoff);
  } catch {
    return [];
  }
}

function writeAttempts(storageKey: string, attempts: number[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${storageKey}`, JSON.stringify(attempts));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Reusable client-side sliding-window rate limiter hook.
 * Persists attempt timestamps in localStorage so limits survive page reloads.
 */
export function useRateLimit(
  storageKey: string,
  maxAttempts = 5,
  windowSeconds = 60
): RateLimitState {
  const windowMs = windowSeconds * 1000;

  const computeRetrySeconds = useCallback((): number => {
    const attempts = readAttempts(storageKey, windowMs);
    if (attempts.length < maxAttempts) return 0;
    const oldest = attempts[0];
    const remainingMs = oldest + windowMs - Date.now();
    return remainingMs > 0 ? Math.ceil(remainingMs / 1000) : 0;
  }, [storageKey, maxAttempts, windowMs]);

  const [retryAfterSeconds, setRetryAfterSeconds] = useState<number>(0);

  // Sync on mount and tick down every second while rate-limited
  useEffect(() => {
    setRetryAfterSeconds(computeRetrySeconds());
  }, [computeRetrySeconds]);

  useEffect(() => {
    if (retryAfterSeconds <= 0) return;

    const timer = setInterval(() => {
      const next = computeRetrySeconds();
      setRetryAfterSeconds(next);
    }, 1000);

    return () => clearInterval(timer);
  }, [retryAfterSeconds, computeRetrySeconds]);

  const recordAttempt = useCallback((): boolean => {
    const attempts = readAttempts(storageKey, windowMs);
    if (attempts.length >= maxAttempts) {
      const remaining = computeRetrySeconds();
      setRetryAfterSeconds(remaining > 0 ? remaining : 1);
      return false;
    }

    const updated = [...attempts, Date.now()];
    writeAttempts(storageKey, updated);

    if (updated.length >= maxAttempts) {
      // Next attempt will be blocked, keep UI aware
      const oldest = updated[0];
      const remainingMs = oldest + windowMs - Date.now();
      if (remainingMs > 0 && updated.length > maxAttempts) {
        setRetryAfterSeconds(Math.ceil(remainingMs / 1000));
      }
    }
    return true;
  }, [storageKey, maxAttempts, windowMs, computeRetrySeconds]);

  return {
    isLimited: retryAfterSeconds > 0,
    retryAfterSeconds,
    recordAttempt,
  };
}
