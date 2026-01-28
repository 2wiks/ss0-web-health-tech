export type Release = {
  version: string;
  date: string;
  summary: string;
  changes: string[];
  docsHref: string;
  downloadHref: string;
};

export const releases: Release[] = [
  {
    version: "0.3.0",
    date: "2026-01-24",
    summary: "Minimal landing and test APK distribution flow.",
    changes: [
      "Introduced monochrome landing experience.",
      "Added versioning metadata and release notes.",
      "Streamlined navigation for early testing.",
    ],
    docsHref: "/docs#v-0.3.0",
    downloadHref: "/downloads/hacking-health-0.3.0.apk",
  },
  {
    version: "0.2.1",
    date: "2026-01-05",
    summary: "Refined layout stability and theme behavior.",
    changes: [
      "Improved light/dark theme consistency.",
      "Adjusted spacing for stronger negative space.",
    ],
    docsHref: "/docs#v-0.2.1",
    downloadHref: "/downloads/hacking-health-0.2.1.apk",
  },
  {
    version: "0.2.0",
    date: "2025-12-18",
    summary: "Initial experimental UI framework.",
    changes: [
      "Established minimal typography and layout system.",
      "Implemented core navigation routes.",
    ],
    docsHref: "/docs#v-0.2.0",
    downloadHref: "/downloads/hacking-health-0.2.0.apk",
  },
];

export const productName = "Hacking Health";
export const latestRelease = releases[0];
export const currentVersion = latestRelease?.version ?? "0.0.0";
