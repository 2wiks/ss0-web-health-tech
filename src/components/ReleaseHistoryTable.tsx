import { getAllReleases } from "@/lib/releases";

export function ReleaseHistoryTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-xs text-muted-foreground">
        <thead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          <tr>
            <th className="pb-2 text-left font-normal">Version</th>
            <th className="pb-2 text-left font-normal">Release Date</th>
            <th className="pb-2 text-left font-normal">Docs</th>
            <th className="pb-2 text-left font-normal">Download</th>
          </tr>
        </thead>
        <tbody className="leading-tight">
          {getAllReleases().map((release) => (
            <tr key={release.version} id={`v-${release.version}`} className="align-top">
              <td className="py-1 pr-4 text-foreground/90">{release.version}</td>
              <td className="py-1 pr-4">{release.releaseDate}</td>
              <td className="py-1 pr-4">
                {release.docs ? (
                  <a
                    href={release.docs}
                    className="hover:text-foreground underline-offset-4 hover:underline"
                  >
                    Docs
                  </a>
                ) : (
                  <span>—</span>
                )}
              </td>
              <td className="py-1">
                {release.apk ? (
                  <a
                    href={release.apk}
                    className="hover:text-foreground underline-offset-4 hover:underline"
                  >
                    APK
                  </a>
                ) : (
                  <span>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
