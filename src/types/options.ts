import { Units } from "../types";

export type Options = {
  svgFileName: string;
  initialCommand: string[];
  lineNumbering: boolean;
  sampleCount: number;
  unit: Omit<Units, "pc" | "pt" | "px">;
  width: number;
  height: number;
  fill: boolean;
};
