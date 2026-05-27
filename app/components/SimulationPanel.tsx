"use client";

import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export function SimulationPanel() {
  const simulationStatus = useWorkspaceStore(
    (state) => state.simulationStatus
  );
  const setSimulationStatus = useWorkspaceStore(
    (state) => state.setSimulationStatus
  );

  return (
    <div className="absolute inset-0 p-4">
      <div className="glass-panel rounded-lg h-full p-4 flex flex-col">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-on-surface">
              Simulation Console
            </h2>
            <p className="text-[11px] text-on-surface-variant">
              Run timing, sensor, and motor simulations.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() =>
              setSimulationStatus(
                simulationStatus === "running" ? "paused" : "running"
              )
            }
          >
            {simulationStatus === "running" ? "Pause" : "Run"}
          </Button>
        </div>
        <div className="mt-4 flex-1 border border-white/10 rounded-md bg-surface-container-low p-4 text-[11px] text-on-surface-variant font-label-mono">
          Simulation status: {simulationStatus}. Configure loop timing and actuator profile.
        </div>
      </div>
    </div>
  );
}
