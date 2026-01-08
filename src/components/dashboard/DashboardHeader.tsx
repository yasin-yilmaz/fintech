import { DashboardHeaderActions } from "./DashboardHeaderActions";
import { DashboardHeaderTitle } from "./DashboardHeaderTitle";
import { UserMenuButton } from "./UserMenuButton";

type Props = {
  title?: string;
  userName?: string;
  avatarUrl?: string;
};

export const DashboardHeader = ({
  title = "Dashboard",
  userName = "Mahfuzul Nabil",
  avatarUrl,
}: Props) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur">
      <div className="flex h-12 items-center justify-between px-10 pt-7.5 pb-10.75">
        <DashboardHeaderTitle>{title}</DashboardHeaderTitle>
        <div className="flex items-center gap-11.25">
          <DashboardHeaderActions />
          <UserMenuButton userName={userName} avatarUrl={avatarUrl} />
        </div>
      </div>
    </header>
  );
};
