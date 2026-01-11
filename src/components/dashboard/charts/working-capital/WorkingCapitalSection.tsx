import { Suspense } from "react";

import { TrendingUp } from "lucide-react";

import { getWorkingCapital } from "@/lib/api/financial/actions";

import { EmptyState } from "@/components/ui/EmptyState";

import { toWorkingCapitalView } from "./workingCapital.mapper";
import { WorkingCapitalChart } from "./WorkingCapitalChart";
import { WorkingCapitalHeader } from "./WorkingCapitalHeader";
import { WorkingCapitalSectionSkeleton } from "./WorkingCapitalSection.skeleton";

export const WorkingCapitalSection = async () => {
  return (
    <section className="ring-border-soft max-w-full min-w-0 rounded-2xl bg-white p-6 ring-1">
      <WorkingCapitalHeader />

      <Suspense fallback={<WorkingCapitalSectionSkeleton />}>
        <WorkingCapitalContent />
      </Suspense>
    </section>
  );
};

const WorkingCapitalContent = async () => {
  const res = await getWorkingCapital();

  if (!res.success) {
    return (
      <EmptyState icon={TrendingUp} title="Working Capital is unavailable" />
    );
  }

  const view = toWorkingCapitalView({
    currency: res.data.currency,
    data: res.data.data,
    summary: res.data.summary,
  });

  return <WorkingCapitalChart view={view} />;
};
