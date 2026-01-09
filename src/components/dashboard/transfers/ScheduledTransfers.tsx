import { ViewAllLink } from "@/components/ui/ViewAllLink";

import { ScheduledTransferItem } from "./ScheduledTransferItem";
import { SCHEDULED_TRANSFERS } from "./scheduledTransfers.data";

export const ScheduledTransfers = () => {
  return (
    <section className="rounded-[10px]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-granite text-lg font-semibold">
          Scheduled Transfers
        </h2>

        <ViewAllLink href="#" />
      </div>

      <ul className="divide-border-soft divide-y">
        {SCHEDULED_TRANSFERS.map((item) => (
          <ScheduledTransferItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
};
