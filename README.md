# Next.js Report Designer

A modular, drag-and-drop report designer built with Next.js 15, TypeScript, and modern web technologies.

## Features

- 🎨 Three-pane layout with toolbox, canvas, and properties panel
- 🖱️ Drag-and-drop interface for adding and positioning elements
- 📏 Grid-based canvas with absolute positioning
- 🎯 Element selection and property editing
- 🎨 Basic styling controls for elements
- 📱 Responsive design

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nextjs-report-builder.git
   cd nextjs-report-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /components
    /Toolbox         # Draggable stencils
    /Canvas          # Drop zone and element rendering
    /PropertiesPanel # Element property editing
  /context          # Report state management
  /designer         # Main designer page
  /hooks           # Custom React hooks
  /lib             # Utility functions and API stubs
```

## Next Steps

### 1. Data Source Integration

- Implement data source connectors in `/lib/data-sources/`
- Add data binding UI in the properties panel
- Create data preview components

### 2. Persistence Layer

- Add backend API routes for saving/loading reports
- Implement report versioning
- Add export functionality (PDF, Excel, etc.)

### 3. Authentication & Authorization

- Add user authentication
- Implement role-based access control
- Add report sharing and collaboration features

### 4. Advanced Features

- Add more element types (Charts, Tables with data)
- Implement undo/redo functionality
- Add element grouping and alignment tools
- Implement responsive design controls
- Add report templates and themes

## Technologies Used

- Next.js 15
- TypeScript
- Tailwind CSS
- @dnd-kit/core for drag-and-drop
- React Hook Form for form handling
- Lucide React for icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
