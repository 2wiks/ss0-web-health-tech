import matter from "gray-matter";

export type ReleaseStatus = "stable" | "beta" | "alpha" | "deprecated";
export type ReleaseType = "phone" | "watch";

export interface Release {
  version: string;
  releaseDate: string;
  apk: string;
  docs: string;
  status?: ReleaseStatus;
  content: string;
  type: ReleaseType;
}

const releaseModules = import.meta.glob("/content/releases/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const normalizeString = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value[0] ? String(value[0]) : "";
  }
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
};

const normalizeStatus = (value: unknown): ReleaseStatus | undefined => {
  const status = normalizeString(value);
  if (status === "stable" || status === "beta" || status === "alpha" || status === "deprecated") {
    return status;
  }
  return undefined;
};

const compareSemver = (a: string, b: string): number => {
  const aParts = a.split(".").map((part) => Number(part) || 0);
  const bParts = b.split(".").map((part) => Number(part) || 0);
  const maxLen = Math.max(aParts.length, bParts.length);
  for (let i = 0; i < maxLen; i += 1) {
    const diff = (bParts[i] ?? 0) - (aParts[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
};

const ensureBuffer = () => {
  const globalAny = globalThis as any;
  if (!globalAny.Buffer) {
    globalAny.Buffer = {
      from: (input: string) => input,
    };
  }
};

const parseRelease = (path: string, raw: string): Release | null => {
  ensureBuffer();
  const { data, content } = matter(raw);
  const version = normalizeString(data.version);
  const releaseDate = normalizeString(data.releaseDate);
  const apk = normalizeString(data.apk);
  const docs = normalizeString(data.docs);

  if (!version || !releaseDate) {
    return null;
  }

  const type: ReleaseType = path.includes("/watch/") ? "watch" : "phone";

  return {
    version,
    releaseDate,
    apk,
    docs,
    status: normalizeStatus(data.status),
    content: content.trim(),
    type,
  };
};

const releases = Object.entries(releaseModules)
  .map(([path, content]) => parseRelease(path, content))
  .filter((release): release is Release => release !== null)
  .sort((a, b) => {
    const dateDiff =
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    return dateDiff !== 0 ? dateDiff : compareSemver(a.version, b.version);
  });

export const getAllReleases = (): Release[] => releases;
export const getPhoneReleases = (): Release[] =>
  releases.filter((r) => r.type === "phone");
export const getWatchReleases = (): Release[] =>
  releases.filter((r) => r.type === "watch");

export const getLatestRelease = (type: ReleaseType = "phone"): Release | undefined =>
  releases.find((r) => r.type === type);

export const getReleaseByVersion = (
  version: string,
  type?: ReleaseType
): Release | undefined =>
  releases.find(
    (release) =>
      release.version === version && (!type || release.type === type)
  );

export const productName = "Hacking Health";
