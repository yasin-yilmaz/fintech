import { DashboardHeaderActions } from "./DashboardHeaderActions";
import { DashboardHeaderTitle } from "./DashboardHeaderTitle";
import { DashboardUserArea } from "./DashboardUserArea";

type Props = {
  title?: string;
};

export const DashboardHeader = ({ title = "Dashboard" }: Props) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur">
      <div className="flex h-12 items-center justify-between px-10 pt-7.5 pb-10.75">
        <DashboardHeaderTitle>{title}</DashboardHeaderTitle>

        <div className="flex items-center gap-11.25">
          <DashboardHeaderActions />
          <DashboardUserArea />
        </div>
      </div>
    </header>
  );
};
