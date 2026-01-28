import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getReleaseByVersion } from "@/lib/releases";
import { PageContainer } from "@/components/layout/page-container";
import { Stack } from "@/components/layout/stack";
import { Heading, Text } from "@/components/ui/typography";

const ReleaseDoc = () => {
  const { version } = useParams<{ version: string }>();
  const release = version ? getReleaseByVersion(version) : undefined;

  if (!release) {
    return (
      <PageContainer>
        <Stack gap="md" className="py-16">
          <Heading as="h1" className="text-2xl font-medium">
            Release not found
          </Heading>
          <Text tone="muted">That release does not exist.</Text>
          <Link
            to="/docs"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Back to releases
          </Link>
        </Stack>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Stack gap="lg" className="py-12">
        <Stack gap="xs">
          <Text tone="muted" size="sm">
            {release.releaseDate}
          </Text>
          <Heading as="h1" className="text-3xl font-medium">
            Release {release.version}
          </Heading>
          {release.status && (
            <Text tone="muted" size="sm">
              Status: {release.status}
            </Text>
          )}
        </Stack>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-xl font-medium text-foreground mt-8 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-lg font-medium text-foreground mt-6 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-base font-medium text-foreground mt-5 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-sm text-foreground leading-relaxed mb-4" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="text-sm text-foreground leading-relaxed mb-4 ml-5 list-disc" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="text-sm text-foreground leading-relaxed mb-4 ml-5 list-decimal" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              a: ({ node, ...props }) => (
                <a className="text-foreground underline hover:opacity-70" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code className="bg-muted px-2 py-1 rounded text-xs font-mono text-foreground" {...props} />
              ),
              pre: ({ node, ...props }) => (
                <pre className="bg-muted p-4 rounded overflow-x-auto mb-5 text-foreground" {...props} />
              ),
            }}
          >
            {release.content}
          </ReactMarkdown>
        </div>
      </Stack>
    </PageContainer>
  );
};

export default ReleaseDoc;
