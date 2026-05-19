import { ClipboardText, Sparkle, Leaf } from "@phosphor-icons/react";

export const HOW_IT_WORKS_STEPS = [
  {
    n: "01",
    Icon: ClipboardText,
    title: "Daily Check-in",
    desc: "Log your mood and energy in under 10 seconds. Nothing more is asked.",
    theme: "blue", // Akan dipetakan ke warna primary di komponen
  },
  {
    n: "02",
    Icon: Sparkle,
    title: "Smart Insights",
    desc: "Gentle AI spots early patterns and quietly surfaces what matters.",
    theme: "purple", // Akan dipetakan ke indigo/violet
  },
  {
    n: "03",
    Icon: Leaf,
    title: "Better Recovery",
    desc: "Receive small, kind suggestions that fit your real life.",
    theme: "teal", // Akan dipetakan ke accent/teal
  },
];

export const MOCK_CHART_DATA = [40, 72, 92, 40, 48, 100, 78];