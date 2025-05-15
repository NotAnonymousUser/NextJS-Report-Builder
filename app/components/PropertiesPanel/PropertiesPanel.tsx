"use client";

import { useForm } from "react-hook-form";
import { useReport } from "../../context/ReportContext";
import { ReportElement } from "../../context/ReportContext";

interface PropertyFormData {
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  fontSize?: number;
  color?: string;
}

export function PropertiesPanel() {
  const { state, dispatch } = useReport();
  const selectedElement = state.elements.find(
    (el) => el.id === state.selectedElementId
  );

  const { register, handleSubmit, reset } = useForm<PropertyFormData>({
    defaultValues: selectedElement
      ? {
          x: selectedElement.x,
          y: selectedElement.y,
          width: selectedElement.width,
          height: selectedElement.height,
          text: selectedElement.props.text,
          fontSize: selectedElement.props.fontSize,
          color: selectedElement.props.color,
        }
      : undefined,
  });

  const onSubmit = (data: PropertyFormData) => {
    if (!selectedElement) return;

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          x: data.x,
          y: data.y,
          width: data.width,
          height: data.height,
          props: {
            ...selectedElement.props,
            text: data.text,
            fontSize: data.fontSize,
            color: data.color,
          },
        },
      },
    });
  };

  if (!selectedElement) {
    return (
      <div className="w-64 h-full bg-gray-50 border-l border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Properties</h2>
        <p className="text-sm text-gray-500">
          Select an element to edit its properties
        </p>
      </div>
    );
  }

  return (
    <div className="w-64 h-full bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Properties</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <input
              type="number"
              {...register("x", { valueAsNumber: true })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              placeholder="X"
            />
            <input
              type="number"
              {...register("y", { valueAsNumber: true })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              placeholder="Y"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Size
          </label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <input
              type="number"
              {...register("width", { valueAsNumber: true })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              placeholder="Width"
            />
            <input
              type="number"
              {...register("height", { valueAsNumber: true })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              placeholder="Height"
            />
          </div>
        </div>

        {selectedElement.type === "TextBox" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Text
              </label>
              <input
                type="text"
                {...register("text")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Font Size
              </label>
              <input
                type="number"
                {...register("fontSize", { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <input
                type="color"
                {...register("color")}
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Apply Changes
        </button>
      </form>
    </div>
  );
}
