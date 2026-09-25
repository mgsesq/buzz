export type AnonymousPublicForge = {
  host: "github.com" | "gitlab.com";
  name: "GitHub" | "GitLab";
};

const ANONYMOUS_PUBLIC_FORGES: AnonymousPublicForge[] = [
  { host: "github.com", name: "GitHub" },
  { host: "gitlab.com", name: "GitLab" },
];

/** Hosts the desktop may clone without credentials. Tauri remains the gate. */
export function isAnonymousPublicForgeHost(
  host: string | null | undefined,
): host is AnonymousPublicForge["host"] {
  return ANONYMOUS_PUBLIC_FORGES.some((forge) => forge.host === host);
}

export function anonymousPublicForgeName(
  host: string | null | undefined,
): AnonymousPublicForge["name"] | null {
  return (
    ANONYMOUS_PUBLIC_FORGES.find((forge) => forge.host === host)?.name ?? null
  );
}

export function anonymousPublicForgeFromUrl(
  url: string | null | undefined,
): AnonymousPublicForge | null {
  try {
    const host = new URL(url ?? "").hostname.toLowerCase();
    return ANONYMOUS_PUBLIC_FORGES.find((forge) => forge.host === host) ?? null;
  } catch {
    return null;
  }
}
