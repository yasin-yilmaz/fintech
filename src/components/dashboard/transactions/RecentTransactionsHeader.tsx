import { SectionTitle } from "@/components/ui/SectionTitle";
import { ViewAllLink } from "@/components/ui/ViewAllLink";

type Props = {
  isFull: boolean;
  onToggle: () => void;
};

export const RecentTransactionsHeader = ({ isFull, onToggle }: Props) => {
  return (
    <header className="flex items-center justify-between px-4 sm:pr-4.75 sm:pl-6.25">
      <SectionTitle>Recent Transaction</SectionTitle>

      <ViewAllLink
        as="button"
        label={isFull ? "Exit" : "View All"}
        onClick={onToggle}
      />
    </header>
  );
};
