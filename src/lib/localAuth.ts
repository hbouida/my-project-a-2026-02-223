export interface LocalUser {
  name: string;
  email: string;
}

const USER_KEY = "peq-academy-current-user";

export function getCurrentUser(): LocalUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LocalUser;
  } catch {
    return null;
  }
}

export function persistCurrentUser(user: LocalUser) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  window.localStorage.removeItem(USER_KEY);
}
