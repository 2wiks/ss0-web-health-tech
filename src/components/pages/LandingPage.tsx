import { DownloadAction } from "@/components/DownloadAction";
import { latestRelease, productName } from "@/data/releases";
import { Stack } from "@/components/layout/stack";

const LandingPage = () => {
  return (
    <Stack className="min-h-[55vh] items-center justify-center">
      <DownloadAction
        productName={productName}
        version={latestRelease?.version ?? "0.0.0"}
        historyHref={latestRelease?.docsHref ?? "/docs"}
      />
    </Stack>
  );
};

export default LandingPage;
