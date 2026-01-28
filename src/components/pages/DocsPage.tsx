import { PageContainer } from "@/components/layout/page-container";
import { Stack } from "@/components/layout/stack";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { ReleaseHistoryTable } from "@/components/ReleaseHistoryTable";

const DocsPage = () => {
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
        <Stack gap="md">
          <Heading as="h3" className="text-xl font-medium">
            Download notes
          </Heading>
          <Text tone="muted">
            APK distributions are shared for testing only. Use the release
            history below to track the intent behind each build.
          </Text>
        </Stack>
        <ReleaseHistoryTable />
      </Stack>
    </PageContainer>
  );
};

export default DocsPage;
