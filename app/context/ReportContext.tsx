"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { DataSource } from "../lib/data-sources";

export interface ReportElement {
  id: string;
  type: "TextBox" | "Table" | "Chart" | "Image" | "Line" | "Container";
  x: number;
  y: number;
  width: number;
  height: number;
  props: {
    text?: string;
    fontSize?: number;
    color?: string;
    dataSourceId?: string;
    columns?: string[];
  };
}

interface ReportState {
  elements: ReportElement[];
  selectedElementId: string | null;
  showGrid: boolean;
}

type ReportAction =
  | { type: "ADD_ELEMENT"; payload: ReportElement }
  | {
      type: "UPDATE_ELEMENT";
      payload: { id: string; updates: Partial<ReportElement> };
    }
  | { type: "DELETE_ELEMENT"; payload: string }
  | { type: "SELECT_ELEMENT"; payload: string | null }
  | { type: "TOGGLE_GRID"; payload: boolean };

const initialState: ReportState = {
  elements: [],
  selectedElementId: null,
  showGrid: true,
};

function reportReducer(state: ReportState, action: ReportAction): ReportState {
  switch (action.type) {
    case "ADD_ELEMENT":
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };
    case "UPDATE_ELEMENT":
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.payload.id
            ? { ...el, ...action.payload.updates }
            : el
        ),
      };
    case "DELETE_ELEMENT":
      return {
        ...state,
        elements: state.elements.filter((el) => el.id !== action.payload),
        selectedElementId:
          state.selectedElementId === action.payload
            ? null
            : state.selectedElementId,
      };
    case "SELECT_ELEMENT":
      return {
        ...state,
        selectedElementId: action.payload,
      };
    case "TOGGLE_GRID":
      return {
        ...state,
        showGrid: action.payload,
      };
    default:
      return state;
  }
}

interface ReportContextType {
  state: ReportState;
  dispatch: React.Dispatch<ReportAction>;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reportReducer, initialState);

  return (
    <ReportContext.Provider value={{ state, dispatch }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error("useReport must be used within a ReportProvider");
  }
  return context;
}
