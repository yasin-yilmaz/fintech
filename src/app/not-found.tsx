import { NotReady } from "@/components/ui/NotReady";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <NotReady
        title="Page not found"
        description="The page you’re looking for doesn’t exist or may have been moved."
        actionHref="/dashboard"
        actionLabel="Back to Dashboard"
      />
    </div>
  );
}
