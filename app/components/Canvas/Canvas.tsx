"use client";

import { useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useReport } from "../../context/ReportContext";
import { ReportElement } from "../../context/ReportContext";
import { useEffect, useState } from "react";
import { dataSources } from "../../lib/data-sources";

interface CanvasProps {
  isDragging: boolean;
}

function TableComponent({ element }: { element: ReportElement }) {
  const dataSource = dataSources.find(
    (ds) => ds.id === element.props.dataSourceId
  );

  if (!dataSource) {
    return (
      <div className="w-full h-full p-2 bg-white border border-black text-black">
        Select a data source in properties
      </div>
    );
  }

  const columns =
    element.props.columns || dataSource.columns.map((col) => col.id);
  const visibleColumns = dataSource.columns.filter((col) =>
    columns.includes(col.id)
  );

  return (
    <div className="w-full h-full overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <th
                key={column.id}
                className="border border-gray-300 bg-gray-100 p-2 text-left"
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {visibleColumns.map((column) => (
                <td key={column.id} className="border border-gray-300 p-2">
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResizeHandle({
  onResize,
  onResizeEnd,
}: {
  onResize: (dx: number, dy: number) => void;
  onResizeEnd: () => void;
}) {
  return (
    <div
      className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const element = e.currentTarget.parentElement;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          onResize(dx, dy);
        };

        const handleMouseUp = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          onResizeEnd();
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className="w-full h-full border-b-2 border-r-2 border-gray-400" />
    </div>
  );
}

function ReportElementComponent({ element }: { element: ReportElement }) {
  const { state, dispatch } = useReport();
  const [isResizing, setIsResizing] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: element,
    disabled: isResizing,
  });

  const isSelected = state.selectedElementId === element.id;

  const handleClick = (e: React.MouseEvent) => {
    if (isResizing) {
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    dispatch({ type: "SELECT_ELEMENT", payload: element.id });
  };

  const handleResize = (dx: number, dy: number) => {
    setIsResizing(true);
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: element.id,
        updates: {
          width: Math.max(100, element.width + dx),
          height: Math.max(100, element.height + dy),
        },
      },
    });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  const style = {
    position: "absolute" as const,
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    touchAction: "none" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      {...(!isResizing ? { ...listeners, ...attributes } : {})}
      className={`border-2 ${
        isSelected ? "border-blue-500" : "border-transparent"
      } hover:border-blue-500 focus:border-blue-500 focus:outline-none ${
        !isResizing ? "cursor-move" : "cursor-default"
      }`}
    >
      {element.type === "TextBox" && (
        <div className="w-full h-full p-2 bg-white border  text-black">
          {element.props.text || "Text Box"}
        </div>
      )}
      {element.type === "Table" && (
        <div className="w-full h-full p-2 bg-white border  text-black">
          <TableComponent element={element} />
        </div>
      )}
      {element.type === "Chart" && (
        <div className="w-full h-full p-2 bg-white border  text-black">
          Chart Placeholder
        </div>
      )}
      {element.type === "Image" && (
        <div className="w-full h-full p-2 bg-white border flex items-center justify-center text-black">
          Image Placeholder
        </div>
      )}
      {element.type === "Line" && (
        <div className="w-full h-full flex items-center">
          <div className="w-full border-t border-gray-400" />
        </div>
      )}
      {element.type === "Container" && (
        <div className="w-full h-full p-2 bg-gray-50 border border-dashed">
          Container
        </div>
      )}
      {isSelected && (
        <ResizeHandle onResize={handleResize} onResizeEnd={handleResizeEnd} />
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.selectedElementId && e.key === "Delete") {
        e.preventDefault();
        dispatch({ type: "DELETE_ELEMENT", payload: state.selectedElementId });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.selectedElementId, dispatch]);

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
