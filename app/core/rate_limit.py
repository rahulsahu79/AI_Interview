import time
from collections import defaultdict
from fastapi import HTTPException, Request, status


class RateLimiter:
    """Reusable sliding-window in-memory rate limiter dependency."""

    def __init__(
        self,
        scope: str,
        max_requests: int = 5,
        window_seconds: int = 60,
        detail: str = "Too many requests, please try again later.",
    ) -> None:
        self.scope = scope
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.detail = detail
        self._attempts: dict[str, list[float]] = defaultdict(list)

    def _get_client_ip(self, request: Request) -> str:
        forwarded_for = request.headers.get("x-forwarded-for")
        if forwarded_for:
            return forwarded_for.split(",")[0].strip()
        return request.client.host if request.client else "unknown"

    def _prune(self, key: str, now: float) -> list[float]:
        cutoff = now - self.window_seconds
        recent = [t for t in self._attempts[key] if t > cutoff]
        if recent:
            self._attempts[key] = recent
        else:
            self._attempts.pop(key, None)
        return recent

    def __call__(self, request: Request) -> None:
        now = time.time()
        client_ip = self._get_client_ip(request)
        key = f"{self.scope}:{client_ip}"
        attempts = self._prune(key, now)

        if len(attempts) >= self.max_requests:
            retry_after = max(1, int(self.window_seconds - (now - attempts[0])))
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"{self.detail} Try again in {retry_after}s.",
                headers={"Retry-After": str(retry_after)},
            )

        attempts.append(now)
        self._attempts[key] = attempts


def create_rate_limiter(
    scope: str,
    max_requests: int = 5,
    window_seconds: int = 60,
    detail: str = "Too many requests, please try again later.",
) -> RateLimiter:
    """Factory for FastAPI Depends(...) rate-limiting dependencies."""
    return RateLimiter(
        scope=scope,
        max_requests=max_requests,
        window_seconds=window_seconds,
        detail=detail,
    )
