"use client";

import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ReportProvider,
  useReport,
  ReportElement,
} from "../context/ReportContext";
import { Toolbox } from "../components/Toolbox/Toolbox";
import { Canvas } from "../components/Canvas/Canvas";
import { PropertiesPanel } from "../components/PropertiesPanel/PropertiesPanel";

function DesignerContent() {
  const { dispatch } = useReport();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === "canvas") {
      const type = active.data.current?.type;
      if (type) {
        const newElement: ReportElement = {
          id: uuidv4(),
          type,
          x: event.delta.x,
          y: event.delta.y,
          width: 200,
          height: 100,
          props: {},
        };

        dispatch({ type: "ADD_ELEMENT", payload: newElement });
      }
    }

    setActiveId(null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen">
        <Toolbox />
        <Canvas />
        <PropertiesPanel />
      </div>
    </DndContext>
  );
}

export default function DesignerPage() {
  return (
    <ReportProvider>
      <DesignerContent />
    </ReportProvider>
  );
}
