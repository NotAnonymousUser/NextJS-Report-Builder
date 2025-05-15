"use client";

import { useReport } from "../../context/ReportContext";
import { dataSources } from "../../lib/data-sources";

export function PropertiesPanel() {
  const { state, dispatch } = useReport();
  const selectedElement = state.elements.find(
    (el) => el.id === state.selectedElementId
  );

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

  const handlePropertyChange = (property: string, value: any) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          props: {
            ...selectedElement.props,
            [property]: value,
          },
        },
      },
    });
  };

  const handlePositionChange = (
    property: "x" | "y" | "width" | "height",
    value: number
  ) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          [property]: value,
        },
      },
    });
  };

  const renderPropertyControls = () => {
    switch (selectedElement.type) {
      case "TextBox":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Text
              </label>
              <input
                type="text"
                value={selectedElement.props.text || ""}
                onChange={(e) => handlePropertyChange("text", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Font Size
              </label>
              <input
                type="number"
                value={selectedElement.props.fontSize || 16}
                onChange={(e) =>
                  handlePropertyChange("fontSize", parseInt(e.target.value))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <input
                type="color"
                value={selectedElement.props.color || "#000000"}
                onChange={(e) => handlePropertyChange("color", e.target.value)}
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              />
            </div>
          </>
        );

      case "Table":
        const selectedDataSource = dataSources.find(
          (ds) => ds.id === selectedElement.props.dataSourceId
        );

        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Data Source
              </label>
              <select
                value={selectedElement.props.dataSourceId || ""}
                onChange={(e) =>
                  handlePropertyChange("dataSourceId", e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              >
                <option value="">Select a data source</option>
                {dataSources.map((ds) => (
                  <option key={ds.id} value={ds.id}>
                    {ds.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedDataSource && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Columns
                </label>
                <div className="mt-2 space-y-2">
                  {selectedDataSource.columns.map((column) => (
                    <label key={column.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedElement.props.columns?.includes(column.id) ??
                          true
                        }
                        onChange={(e) => {
                          const currentColumns =
                            selectedElement.props.columns ||
                            selectedDataSource.columns.map((col) => col.id);
                          const newColumns = e.target.checked
                            ? [...currentColumns, column.id]
                            : currentColumns.filter((id) => id !== column.id);
                          handlePropertyChange("columns", newColumns);
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {column.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </>
        );

      case "Chart":
        return (
          <div className="text-sm text-gray-500">
            Chart properties will be implemented here
          </div>
        );

      case "Image":
        return (
          <div className="text-sm text-gray-500">
            Image properties will be implemented here
          </div>
        );

      case "Line":
        return (
          <div className="text-sm text-gray-500">
            Line properties will be implemented here
          </div>
        );

      case "Container":
        return (
          <div className="text-sm text-gray-500">
            Container properties will be implemented here
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-64 h-full bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Properties</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <div className="mt-1 px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-900">
            {selectedElement.type}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500">X</label>
              <input
                type="number"
                value={selectedElement.x}
                onChange={(e) =>
                  handlePositionChange("x", parseInt(e.target.value))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Y</label>
              <input
                type="number"
                value={selectedElement.y}
                onChange={(e) =>
                  handlePositionChange("y", parseInt(e.target.value))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Size
          </label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500">Width</label>
              <input
                type="number"
                value={selectedElement.width}
                onChange={(e) =>
                  handlePositionChange("width", parseInt(e.target.value))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Height</label>
              <input
                type="number"
                value={selectedElement.height}
                onChange={(e) =>
                  handlePositionChange("height", parseInt(e.target.value))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
              />
            </div>
          </div>
        </div>
        {renderPropertyControls()}
      </div>
    </div>
  );
}
