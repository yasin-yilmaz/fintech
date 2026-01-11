import { TrendingUp } from "lucide-react";

import { getWorkingCapital } from "@/lib/api/financial/actions";

import { EmptyState } from "@/components/ui/EmptyState";

import { toWorkingCapitalView } from "./workingCapital.mapper";
import { WorkingCapitalChart } from "./WorkingCapitalChart";

export const WorkingCapitalSection = async () => {
  const res = await getWorkingCapital();

  if (!res.success) {
    return (
      <section className="ring-border-soft rounded-2xl bg-white p-6 ring-1">
        <EmptyState icon={TrendingUp} title="Working Capital is unavailable" />
      </section>
    );
  }

  const view = toWorkingCapitalView({
    currency: res.data.currency,
    data: res.data.data,
    summary: res.data.summary,
  });

  return <WorkingCapitalChart view={view} />;
};
