import { getRegionals, getTaskStatus } from "./queries";
import { RegionalCard } from "./regional-card";
import { TaskStatusCard } from "./task-status-card";

export default async function PengaturanAplikasiPage() {
  const regionals = await getRegionals();
  const allTaskStatus = await getTaskStatus();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <RegionalCard regionals={regionals} />
      <TaskStatusCard allTaskStatus={allTaskStatus} />
    </div>
  );
}
