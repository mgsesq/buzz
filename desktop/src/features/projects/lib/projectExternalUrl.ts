function repositoryPathSegments(url: URL): string[] | null {
  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length < 2) return null;
  const repository = segments.at(-1)?.replace(/\.git$/i, "");
  if (!segments[0] || !repository) return null;
  return [...segments.slice(0, -1), repository];
}

/** Builds a forge web URL scoped to the selected branch or tag. */
export function projectExternalRefUrl(
  externalUrl: string | null | undefined,
  ref: string | null | undefined,
): string | null {
  if (!externalUrl) return null;
  const selectedRef = ref?.trim();
  if (!selectedRef) return externalUrl;

  try {
    const url = new URL(externalUrl);
    if (url.protocol !== "https:") return externalUrl;
    const host = url.hostname.toLowerCase();
    const segments = repositoryPathSegments(url);
    if (!segments) return externalUrl;
    const encodedRef = encodeURIComponent(selectedRef);
    const repositoryPath = segments.join("/");
    if (host === "github.com" && segments.length === 2) {
      return `${url.origin}/${repositoryPath}/tree/${encodedRef}`;
    }
    if (host === "gitlab.com") {
      return `${url.origin}/${repositoryPath}/-/tree/${encodedRef}`;
    }
    return externalUrl;
  } catch {
    return externalUrl;
  }
}
