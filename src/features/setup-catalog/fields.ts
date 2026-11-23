import type { SetupCategory } from "./catalog";

export const SETUP_CATEGORIES: SetupCategory[] = ["mouse", "keyboard", "monitor", "mousepad", "iem"];

export const SETUP_LABELS: Record<SetupCategory, string> = {
  mouse: "Mouse",
  keyboard: "Keyboard",
  monitor: "Monitor",
  mousepad: "Mousepad",
  iem: "IEM",
};

export const SETUP_SEARCH_PLACEHOLDERS: Record<SetupCategory, string> = {
  mouse: "Search mice",
  keyboard: "Search keyboards",
  monitor: "Search monitors",
  mousepad: "Search mousepads",
  iem: "Search IEMs",
};
