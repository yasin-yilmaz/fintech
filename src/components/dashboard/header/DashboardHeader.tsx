import { DashboardHeaderActions } from "./DashboardHeaderActions";
import { DashboardHeaderTitle } from "./DashboardHeaderTitle";
import { DashboardUserArea } from "./DashboardUserArea";
import { MobileSidebarButton } from "./MobileSidebarButton";

type Props = { title?: string };

export const DashboardHeader = ({ title = "Dashboard" }: Props) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur">
      <div className="flex h-12 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <MobileSidebarButton />
          <DashboardHeaderTitle className="min-w-0">
            {title}
          </DashboardHeaderTitle>
        </div>

        <div className="flex items-center gap-4 md:gap-11.25">
          <DashboardHeaderActions />
          <DashboardUserArea />
        </div>
      </div>
    </header>
  );
};
