"use client";

import { devices } from "@/data/mockData";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export function DeviceSelector() {
  const selectedDeviceId = useWorkspaceStore((state) => state.selectedDeviceId);
  const setSelectedDeviceId = useWorkspaceStore(
    (state) => state.setSelectedDeviceId
  );

  return (
    <div className="flex items-center bg-surface-bright border border-white/[0.06] rounded px-1.5 py-0.5 gap-1.5">
      <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
        memory_alt
      </span>
      <select
        className="bg-transparent border-none text-on-surface font-label-mono text-[10px] focus:ring-0 py-0 pl-0 pr-5 cursor-pointer"
        value={selectedDeviceId}
        onChange={(event) => setSelectedDeviceId(event.target.value)}
      >
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.label}
          </option>
        ))}
      </select>
    </div>
  );
}
