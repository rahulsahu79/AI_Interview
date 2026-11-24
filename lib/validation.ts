// ─── Shared Validation Rules & Messages ───────────────────────────────────────
// Single source of truth used by the signup form (and any other form that needs
// the same rules).  The backend mirrors these exact same constraints in
// backend/app/schemas/user.py so the two layers stay in sync.
// ───────────────────────────────────────────────────────────────────────────────

// ── Username ──────────────────────────────────────────────────────────────────
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 50;
const USERNAME_REGEX = /^[A-Za-z]+$/;

export function validateUsername(value: string): string | null {
  if (!value.trim()) return "Username is required.";
  if (!USERNAME_REGEX.test(value))
    return "Username must contain only letters (A–Z, a–z).";
  if (value.length < USERNAME_MIN_LENGTH)
    return `Username must be at least ${USERNAME_MIN_LENGTH} characters.`;
  if (value.length > USERNAME_MAX_LENGTH)
    return `Username must be at most ${USERNAME_MAX_LENGTH} characters.`;
  return null;
}

// ── Email ─────────────────────────────────────────────────────────────────────
// Stricter than the browser's built-in `type="email"`:
//  • local part: letters, digits, . _ % + -
//  • @ required
//  • domain labels: letters, digits, hyphens; at least two labels
//  • TLD: 2–10 letters (rejects ".c" or bare IPs)
const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,10}$/;

export function validateEmail(value: string): string | null {
  if (!value.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(value))
    return "Please enter a valid email address (e.g. name@example.com).";
  return null;
}

// ── Password ──────────────────────────────────────────────────────────────────
export const PASSWORD_MIN_LENGTH = 8;

export interface PasswordCheck {
  label: string;
  passed: boolean;
}

/** Returns an array of individual requirement checks (for the strength meter). */
export function getPasswordChecks(value: string): PasswordCheck[] {
  return [
    {
      label: `At least ${PASSWORD_MIN_LENGTH} characters`,
      passed: value.length >= PASSWORD_MIN_LENGTH,
    },
    { label: "One uppercase letter (A–Z)", passed: /[A-Z]/.test(value) },
    { label: "One lowercase letter (a–z)", passed: /[a-z]/.test(value) },
    { label: "One digit (0–9)", passed: /\d/.test(value) },
    {
      label: "One special character (!@#$%…)",
      passed: /[^A-Za-z0-9]/.test(value),
    },
  ];
}

/** Returns the first failing rule's label, or null if the password is valid. */
export function validatePassword(value: string): string | null {
  if (!value) return "Password is required.";
  const failing = getPasswordChecks(value).find((c) => !c.passed);
  return failing ? `Password must have: ${failing.label.toLowerCase()}.` : null;
}
