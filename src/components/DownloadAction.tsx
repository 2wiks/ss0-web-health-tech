import { Download } from "lucide-react";

type DownloadActionProps = {
  productName: string;
  version: string;
  historyHref: string;
  historyLabel?: string;
  downloadHref?: string;
  onDownload?: () => void;
};

export function DownloadAction({
  productName,
  version,
  historyHref,
  historyLabel = "View all versions and release notes",
  downloadHref,
  onDownload,
}: DownloadActionProps) {
  const handleClick = () => {
    if (onDownload) onDownload();
  };

  return (
    <div className="flex items-center gap-6">
      {downloadHref ? (
        <a
          href={downloadHref}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-transparent text-foreground transition-[border-color,opacity] hover:border-foreground/40 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:opacity-70"
          aria-label="Download APK"
        >
          <Download className="h-6 w-6" strokeWidth={1.5} />
        </a>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-transparent text-foreground transition-[border-color,opacity] hover:border-foreground/40 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:opacity-70"
          aria-label="Download APK"
        >
          <Download className="h-6 w-6" strokeWidth={1.5} />
        </button>
      )}
      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
        <span>{`${productName} Version ${version}`}</span>
        <a
          href={historyHref}
          className="text-[11px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {historyLabel}
        </a>
      </div>
    </div>
  );
}
