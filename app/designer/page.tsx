"use client";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
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
  const { state, dispatch } = useReport();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id.toString();
    setActiveId(id);
    setIsDragging(true);

    // If we're dragging an existing element, don't deselect it
    if (!id.startsWith("stencil-")) {
      dispatch({ type: "SELECT_ELEMENT", payload: id });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;

    if (!over) {
      setActiveId(null);
      setIsDragging(false);
      return;
    }

    // Handle new element being dropped from toolbox
    if (active.id.toString().startsWith("stencil-")) {
      if (over.id === "canvas") {
        const type = active.data.current?.type;
        if (type) {
          const newElement: ReportElement = {
            id: uuidv4(),
            type,
            x: delta.x,
            y: delta.y,
            width: 200,
            height: 100,
            props: {},
          };

          dispatch({ type: "ADD_ELEMENT", payload: newElement });
          dispatch({ type: "SELECT_ELEMENT", payload: newElement.id });
        }
      }
    }
    // Handle existing element being moved
    else {
      const element = state.elements.find((el) => el.id === active.id);
      if (element) {
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id: element.id,
            updates: {
              x: element.x + delta.x,
              y: element.y + delta.y,
            },
          },
        });
      }
    }

    setActiveId(null);
    setIsDragging(false);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setIsDragging(false);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex h-screen">
        <Toolbox />
        <Canvas isDragging={isDragging} />
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
