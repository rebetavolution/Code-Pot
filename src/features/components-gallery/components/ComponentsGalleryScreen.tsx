import { PageHeader } from "../../../shared/components/layout/PageHeader";
import { Stack } from "../../../shared/components/layout/Stack";
import { Card } from "../../../shared/components/Card";
import { Button } from "../../../shared/components/Button";


export function ComponentsGalleryScreen() {
  return (
    <Stack gap={6} className="p-6">
      <PageHeader title="Components" />
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Buttons</h2>
        <div className="flex gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </Card>
    </Stack>
  );
}

