import { DownloadAction } from "@/components/DownloadAction";
import { getLatestRelease } from "@/lib/releases";
import { Stack } from "@/components/layout/stack";
import { Smartphone, Watch } from "lucide-react";

const LandingPage = () => {
  const latestPhone = getLatestRelease("phone");
  const latestWatch = getLatestRelease("watch");

  return (
    <Stack className="min-h-[55vh] items-center justify-center">
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        <DownloadAction
          productName="Phone"
          version={latestPhone?.version ?? "—"}
          historyHref="/docs#phone"
          downloadHref={latestPhone?.apk}
          icon={Smartphone}
        />
        <DownloadAction
          productName="Watch"
          version={latestWatch?.version ?? "—"}
          historyHref="/docs#watch"
          downloadHref={latestWatch?.apk}
          icon={Watch}
        />
      </div>
    </Stack>
  );
};

export default LandingPage;
