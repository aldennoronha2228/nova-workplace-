"use client";

import { Button } from "@/components/ui/button";

export function AssemblyPanel() {
  return (
    <div className="absolute inset-0 p-4">
      <div className="glass-panel rounded-lg h-full p-4 flex flex-col">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-on-surface">
              Assembly Checklist
            </h2>
            <p className="text-[11px] text-on-surface-variant">
              Track BOM, wiring, and mechanical assembly.
            </p>
          </div>
          <Button size="sm" variant="outline">
            Export
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
          <div className="border border-white/10 rounded-md p-3">
            <p className="text-on-surface">BOM Status</p>
            <p className="text-on-surface-variant">6/8 parts verified</p>
          </div>
          <div className="border border-white/10 rounded-md p-3">
            <p className="text-on-surface">Harness</p>
            <p className="text-on-surface-variant">Calibration pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}
