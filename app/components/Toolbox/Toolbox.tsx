"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Text, Table, BarChart2, Image, Minus, Box } from "lucide-react";

const stencils = [
  { type: "TextBox", icon: Text, label: "Text Box" },
  { type: "Table", icon: Table, label: "Table" },
  { type: "Chart", icon: BarChart2, label: "Chart" },
  { type: "Image", icon: Image, label: "Image" },
  { type: "Line", icon: Minus, label: "Line" },
  { type: "Container", icon: Box, label: "Container" },
] as const;

function DraggableStencil({
  type,
  icon: Icon,
  label,
}: (typeof stencils)[number]) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `stencil-${type}`,
    data: { type },
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm cursor-move hover:bg-gray-50 transition-colors"
    >
      <Icon className="w-5 h-5 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}

export function Toolbox() {
  return (
    <div className="w-64 h-full bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Toolbox</h2>
      <div className="space-y-2">
        {stencils.map((stencil) => (
          <DraggableStencil key={stencil.type} {...stencil} />
        ))}
      </div>
    </div>
  );
}
