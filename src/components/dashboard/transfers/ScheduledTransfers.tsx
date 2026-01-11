import { CalendarClock } from "lucide-react";

import { getScheduledTransfers } from "@/lib/api/financial/actions";

import { EmptyState } from "@/components/ui/EmptyState";
import { ViewAllLink } from "@/components/ui/ViewAllLink";

import { ScheduledTransferItem } from "./ScheduledTransferItem";
import { toTransferItem } from "./scheduledTransfers.mapper";

const DASHBOARD_LIMIT = 5;

const ScheduledTransfersHeader = () => (
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-granite text-lg font-semibold">Scheduled Transfers</h2>
    <ViewAllLink href="/dashboard/transfers" />
  </div>
);

export const ScheduledTransfers = async () => {
  const res = await getScheduledTransfers();

  if (!res.success) {
    return (
      <section className="rounded-[10px]">
        <ScheduledTransfersHeader />
        <EmptyState icon={CalendarClock} title="No scheduled transfers" />
      </section>
    );
  }

  const items = res.data.transfers.map(toTransferItem);
  const visible = items.slice(0, DASHBOARD_LIMIT);

  return (
    <section className="rounded-[10px]">
      <ScheduledTransfersHeader />
      {visible.length === 0 ? (
        <EmptyState icon={CalendarClock} title="No scheduled transfers" />
      ) : (
        <ul className="divide-border-soft divide-y">
          {visible.map((item) => (
            <ScheduledTransferItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </section>
  );
};
