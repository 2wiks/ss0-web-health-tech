import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { PageContainer } from "@/components/layout/page-container";
import { Stack } from "@/components/layout/stack";
import { Box } from "@/components/ui/box";
import { CodeBlock } from "@/components/data-display/code-block";
import { ComponentSection } from "@/components/sandbox/component-section";

const Sandbox = () => {
  const [email, setEmail] = useState("");

  return (
    <PageContainer className="py-10 space-y-10">
      <Stack gap="sm">
        <Heading as="h1" className="text-3xl md:text-4xl">
          Component Sandbox
        </Heading>
        <Text tone="muted">
          Living design system for primitives, layouts, and composed blocks.
        </Text>
      </Stack>

      <ComponentSection
        eyebrow="Primitives"
        title="Buttons"
        description="Intent and size variants, disabled and loading states."
      >
        <Stack direction="row" gap="sm" className="flex-wrap">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </Stack>
        <CodeBlock>
          {`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>`}
        </CodeBlock>
      </ComponentSection>

      <ComponentSection
        eyebrow="Primitives"
        title="Inputs"
        description="Controlled and uncontrolled inputs with labels and help."
      >
        <Stack gap="sm" className="max-w-md">
          <Input
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Text size="sm" tone="muted">
            We only use this to contact you about updates.
          </Text>
        </Stack>
        <CodeBlock>
          {`<Input placeholder="Email address" />
<Text size="sm" tone="muted">Helper text</Text>`}
        </CodeBlock>
      </ComponentSection>

      <ComponentSection
        eyebrow="Primitives"
        title="Badges"
        description="Status and emphasis tokens."
      >
        <Stack direction="row" gap="sm" className="flex-wrap">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </Stack>
      </ComponentSection>

      <ComponentSection
        eyebrow="Data Display"
        title="Cards"
        description="Surface, header, content, and composition."
      >
        <Box className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>Account health</CardHeader>
            <CardContent>
              <Text size="sm" tone="muted">
                Your monitoring devices are synced and up to date.
              </Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>Next steps</CardHeader>
            <CardContent>
              <Text size="sm" tone="muted">
                Review your latest biomarker trends in the dashboard.
              </Text>
            </CardContent>
          </Card>
        </Box>
      </ComponentSection>

      <ComponentSection
        eyebrow="Feedback"
        title="Alerts"
        description="Accessible announcement blocks."
      >
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>
            This is a preview environment. Data is reset nightly.
          </AlertDescription>
        </Alert>
      </ComponentSection>
    </PageContainer>
  );
};

export default Sandbox;
