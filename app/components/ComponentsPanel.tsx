"use client";

import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { cn } from "@/lib/utils";

const componentCatalog = [
  { id: "esp32", name: "ESP32 DevKit", icon: "memory" },
  { id: "arduino", name: "Arduino Uno", icon: "developer_board" },
  { id: "sensor", name: "Hall Sensor", icon: "sensors" },
  { id: "driver", name: "Driver Module", icon: "settings_input_component" },
  { id: "led", name: "LED Strip", icon: "light" },
  { id: "motor", name: "Stepper Motor", icon: "rotate_right" },
];

export function ComponentsPanel() {
  const selectedComponentIds = useWorkspaceStore(
    (state) => state.selectedComponentIds
  );
  const toggleSelectedComponent = useWorkspaceStore(
    (state) => state.toggleSelectedComponent
  );

  return (
    <div className="absolute inset-0 p-4">
      <div className="glass-panel rounded-lg h-full p-4 flex flex-col">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-on-surface">
              Component Library
            </h2>
            <p className="text-[11px] text-on-surface-variant">
              Drag modules into the circuit canvas.
            </p>
          </div>
          <Button size="sm" variant="outline">
            Sync
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {componentCatalog.map((component) => {
            const selected = selectedComponentIds.includes(component.id);
            return (
              <button
                key={component.id}
                onClick={() => toggleSelectedComponent(component.id)}
                className={cn(
                  "border border-white/10 rounded-md p-3 text-left hover:bg-surface-bright/40",
                  selected && "bg-white/10 border-white/30"
                )}
              >
                <div className="flex items-center gap-2 text-xs text-on-surface">
                  <span className="material-symbols-outlined text-[16px]">
                    {component.icon}
                  </span>
                  {component.name}
                </div>
                <p className="mt-2 text-[10px] text-on-surface-variant">
                  Ready to place in workspace
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
