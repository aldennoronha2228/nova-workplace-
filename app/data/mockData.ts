import type { Edge, Node } from "reactflow";
import type { ChatMessage, DeviceOption, FileNode, FileTab, TerminalLog } from "@/types/workspace";

export const projectTree: FileNode[] = [
  {
    id: "firmware",
    name: "firmware",
    type: "folder",
    path: "project/firmware",
    icon: "terminal",
    children: [
      {
        id: "main-ino",
        name: "main.ino",
        type: "file",
        path: "project/firmware/main.ino",
        icon: "terminal",
      },
      {
        id: "sensors-cpp",
        name: "sensors.cpp",
        type: "file",
        path: "project/firmware/sensors.cpp",
        icon: "memory",
      },
    ],
  },
  {
    id: "hardware",
    name: "hardware",
    type: "folder",
    path: "project/hardware",
    icon: "account_tree",
    children: [
      {
        id: "schematic-json",
        name: "schematic.json",
        type: "file",
        path: "project/hardware/schematic.json",
        icon: "account_tree",
      },
      {
        id: "components-json",
        name: "components.json",
        type: "file",
        path: "project/hardware/components.json",
        icon: "view_module",
      },
    ],
  },
  {
    id: "simulation",
    name: "simulation",
    type: "folder",
    path: "project/simulation",
    icon: "precision_manufacturing",
    children: [
      {
        id: "simulation-config",
        name: "simulation.config",
        type: "file",
        path: "project/simulation/simulation.config",
        icon: "precision_manufacturing",
      },
    ],
  },
  {
    id: "docs",
    name: "docs",
    type: "folder",
    path: "project/docs",
    icon: "description",
    children: [
      {
        id: "wiring-md",
        name: "wiring.md",
        type: "file",
        path: "project/docs/wiring.md",
        icon: "description",
      },
    ],
  },
];

export const defaultTabs: FileTab[] = [
  {
    id: "schematic-json",
    name: "schematic.json",
    path: "project/hardware/schematic.json",
    language: "json",
  },
  {
    id: "main-ino",
    name: "main.ino",
    path: "project/firmware/main.ino",
    language: "cpp",
  },
];

export const fileContents: Record<string, string> = {
  "project/firmware/main.ino": `#include <Arduino.h>\n\nconst int hallPin = 15;\n\nvoid setup() {\n  Serial.begin(115200);\n  pinMode(hallPin, INPUT);\n}\n\nvoid loop() {\n  int sensorValue = analogRead(hallPin);\n  Serial.println(sensorValue);\n  delay(50);\n}\n`,
  "project/firmware/sensors.cpp": `#include <Arduino.h>\n\nint readHallSensor(int pin) {\n  return analogRead(pin);\n}\n`,
  "project/hardware/schematic.json": `{"board":"esp32-devkit-v1","nodes":3,"edges":4}`,
  "project/hardware/components.json": `[{"type":"ESP32","qty":1},{"type":"Hall Sensor","qty":1}]`,
  "project/simulation/simulation.config": `{
  "clockSpeed": 160000000,
  "loopDelayMs": 50,
  "runtimeMode": "deterministic"
}`,
  "project/docs/wiring.md": `# Wiring Notes\n\n- KY-035 VCC -> 3V3\n- KY-035 GND -> GND\n- KY-035 Signal -> D15 (ADC2_CH3)\n`,
};

export const devices: DeviceOption[] = [
  { id: "esp32-devkit", label: "ESP32 DevKit v1" },
  { id: "arduino-uno", label: "Arduino Uno R3" },
  { id: "pi-pico", label: "Raspberry Pi Pico" },
];

export const initialChat: ChatMessage[] = [
  {
    id: "msg-user-1",
    role: "user",
    content:
      "How do I connect the KY-035 Hall effect sensor to the ESP32 for this split-flap display?",
    timestamp: "User • 10:42 AM",
  },
  {
    id: "msg-ai-1",
    role: "assistant",
    content:
      "To integrate the KY-035 analog Hall effect sensor with your ESP32 DevKit v1 for the split-flap calibration:\n\n**Wiring Map**\n- KY-035 VCC -> ESP32 3V3\n- KY-035 GND -> ESP32 GND\n- KY-035 Signal -> ESP32 D15 (ADC2_CH3)\n\nWould you like me to generate the initialization code?",
    timestamp: "Nova AI • 10:43 AM",
  },
];

export const terminalLogs: TerminalLog[] = [
  {
    id: "term-build",
    tab: "build",
    status: "success",
    lines: [
      "[12:44:11] Build started...",
      "[12:44:14] Compiling firmware/main.ino",
      "[12:44:16] Linking output...",
      "[12:44:18] Build succeeded in 3.4s",
    ],
  },
  {
    id: "term-serial",
    tab: "serial",
    status: "running",
    lines: [
      "[12:44:20] Serial connected on COM7 @115200",
      "[12:44:23] Hall Sensor: 512",
      "[12:44:25] Hall Sensor: 508",
    ],
  },
  {
    id: "term-debug",
    tab: "debug",
    status: "idle",
    lines: ["[12:44:30] Debug session idle"],
  },
  {
    id: "term-ai",
    tab: "ai",
    status: "idle",
    lines: ["[12:44:12] AI build analyzer ready"],
  },
];

export const initialNodes: Node[] = [
  {
    id: "esp32",
    type: "circuit",
    position: { x: 80, y: 160 },
    data: { label: "ESP32 DevKit" },
  },
  {
    id: "ky-035",
    type: "circuit",
    position: { x: 520, y: 130 },
    data: { label: "KY-035 Hall" },
  },
  {
    id: "uln2003",
    type: "circuit",
    position: { x: 520, y: 340 },
    data: { label: "ULN2003" },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "esp32",
    target: "ky-035",
    animated: true,
    style: { stroke: "#ffffff", strokeWidth: 1.5 },
  },
  {
    id: "e2",
    source: "esp32",
    target: "uln2003",
    animated: true,
    style: { stroke: "#ffffff", strokeWidth: 1.5 },
  },
];
