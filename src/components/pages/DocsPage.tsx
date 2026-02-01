import { PageContainer } from "@/components/layout/page-container";
import { Stack } from "@/components/layout/stack";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { ReleaseHistoryTable } from "@/components/ReleaseHistoryTable";
import { getPhoneReleases, getWatchReleases } from "@/lib/releases";

const DocsPage = () => {
  const phoneReleases = getPhoneReleases();
  const watchReleases = getWatchReleases();

  return (
    <PageContainer>
      <Stack gap="xl" className="py-10">
        <Stack gap="sm">
          <Eyebrow>Docs</Eyebrow>
          <Heading as="h1" className="text-3xl font-medium">
            Minimal documentation
          </Heading>
          <Text tone="muted">
            A quiet reference for the experiment. Focused, monochrome, and
            unapologetically simple.
          </Text>
        </Stack>

        <Stack gap="md" id="phone">
          <Heading as="h3" className="text-xl font-medium">
            Phone App Releases
          </Heading>
          <Text tone="muted">
            APK distributions for the mobile application.
          </Text>
          <ReleaseHistoryTable releases={phoneReleases} />
        </Stack>

        <Stack gap="md" id="watch">
          <Heading as="h3" className="text-xl font-medium">
            Watch App Releases
          </Heading>
          <Text tone="muted">
            APK distributions for the watch application.
          </Text>
          <ReleaseHistoryTable releases={watchReleases} />
        </Stack>
      </Stack>
    </PageContainer>
  );
};

export default DocsPage;
