import { DownloadAction } from "@/components/DownloadAction";
import { getLatestRelease, productName } from "@/lib/releases";
import { Stack } from "@/components/layout/stack";

const LandingPage = () => {
  const latestRelease = getLatestRelease();

  return (
    <Stack className="min-h-[55vh] items-center justify-center">
      <DownloadAction
        productName={productName}
        version={latestRelease?.version ?? "0.0.0"}
        historyHref="/docs"
        downloadHref={latestRelease?.apk}
      />
    </Stack>
  );
};

export default LandingPage;
