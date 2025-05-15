"use client";

import { useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useReport } from "../../context/ReportContext";
import { ReportElement } from "../../context/ReportContext";

interface CanvasProps {
  isDragging: boolean;
}

function ReportElementComponent({ element }: { element: ReportElement }) {
  const { state, dispatch } = useReport();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: element,
  });

  const isSelected = state.selectedElementId === element.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "SELECT_ELEMENT", payload: element.id });
  };

  const handleDelete = (e: React.KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      dispatch({ type: "DELETE_ELEMENT", payload: element.id });
    }
  };

  const style = {
    position: "absolute" as const,
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      onKeyDown={handleDelete}
      {...listeners}
      {...attributes}
      className={`border-2 ${
        isSelected ? "border-blue-500" : "border-transparent"
      } hover:border-blue-500 focus:border-blue-500 focus:outline-none cursor-move`}
    >
      {element.type === "TextBox" && (
        <div className="w-full h-full p-2 bg-white border border-black text-black">
          {element.props.text || "Text Box"}
        </div>
      )}
      {element.type === "Table" && (
        <div className="w-full h-full p-2 bg-white border border-black text-black">
          Table Placeholder
        </div>
      )}
      {element.type === "Chart" && (
        <div className="w-full h-full p-2 bg-white border border-black text-black">
          Chart Placeholder
        </div>
      )}
      {element.type === "Image" && (
        <div className="w-full h-full p-2 bg-white border flex items-center justify-center border-black text-black">
          Image Placeholder
        </div>
      )}
      {element.type === "Line" && (
        <div className="w-full h-full flex items-center">
          <div className="w-full border-t border-gray-400" />
        </div>
      )}
      {element.type === "Container" && (
        <div className="w-full h-full p-2 bg-gray-50 border border-dashed border-black">
          Container
        </div>
      )}
    </div>
  );
}

export function Canvas({ isDragging }: CanvasProps) {
  const { state, dispatch } = useReport();
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  const handleCanvasClick = () => {
    if (!isDragging) {
      dispatch({ type: "SELECT_ELEMENT", payload: null });
    }
  };

  return (
    <div
      ref={setNodeRef}
      onClick={handleCanvasClick}
      className="flex-1 h-full bg-white relative overflow-auto"
      style={{
        backgroundImage: state.showGrid
          ? "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)"
          : "none",
        backgroundSize: "20px 20px",
      }}
    >
      {state.elements.map((element) => (
        <ReportElementComponent key={element.id} element={element} />
      ))}
    </div>
  );
}
