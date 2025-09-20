export type ProjectSummary = {
  home_port: number;
  home_connected: number;
  idle_port: number;
};

export type RegionalSummaryIdle = {
  name: string;
  years: Record<string, ProjectSummary>;
};

export type RegionalSummaryOccupancy = {
  name: string;
  home_port: number;
  home_connected: number;
  idle_port: number;
  ach: number;
};
