import { Units } from "../types";

export type Options = {
  initialCommand: [];
  lineNumbering: boolean;
  sampleCount: number;
  svgFileName: string;
  unit: Omit<Units, "pc" | "pt" | "px">;
  width: number;
  height: number;
};
