export interface DataSource {
  id: string;
  name: string;
  type: "table" | "chart";
  data: any[];
  columns: { id: string; name: string; type: string }[];
}

export const dataSources: DataSource[] = [
  {
    id: "cities",
    name: "Cities",
    type: "table",
    columns: [
      { id: "name", name: "City Name", type: "string" },
      { id: "population", name: "Population", type: "number" },
      { id: "country", name: "Country", type: "string" },
      { id: "area", name: "Area (km²)", type: "number" },
    ],
    data: [
      { name: "New York", population: 8419000, country: "USA", area: 783.8 },
      { name: "London", population: 8982000, country: "UK", area: 1572 },
      { name: "Tokyo", population: 37400000, country: "Japan", area: 2194 },
      { name: "Paris", population: 2148000, country: "France", area: 105.4 },
      {
        name: "Sydney",
        population: 5312000,
        country: "Australia",
        area: 12367,
      },
    ],
  },
  {
    id: "employees",
    name: "Employees",
    type: "table",
    columns: [
      { id: "name", name: "Name", type: "string" },
      { id: "department", name: "Department", type: "string" },
      { id: "salary", name: "Salary", type: "number" },
      { id: "joinDate", name: "Join Date", type: "date" },
    ],
    data: [
      {
        name: "John Smith",
        department: "Engineering",
        salary: 85000,
        joinDate: "2020-01-15",
      },
      {
        name: "Sarah Johnson",
        department: "Marketing",
        salary: 72000,
        joinDate: "2019-06-01",
      },
      {
        name: "Michael Brown",
        department: "Sales",
        salary: 65000,
        joinDate: "2021-03-10",
      },
      {
        name: "Emily Davis",
        department: "HR",
        salary: 68000,
        joinDate: "2020-11-20",
      },
      {
        name: "David Wilson",
        department: "Engineering",
        salary: 92000,
        joinDate: "2018-09-05",
      },
    ],
  },
  {
    id: "products",
    name: "Products",
    type: "table",
    columns: [
      { id: "name", name: "Product Name", type: "string" },
      { id: "category", name: "Category", type: "string" },
      { id: "price", name: "Price", type: "number" },
      { id: "stock", name: "Stock", type: "number" },
    ],
    data: [
      {
        name: "Laptop Pro",
        category: "Electronics",
        price: 1299.99,
        stock: 45,
      },
      {
        name: "Smart Watch",
        category: "Electronics",
        price: 299.99,
        stock: 120,
      },
      { name: "Coffee Maker", category: "Home", price: 89.99, stock: 30 },
      { name: "Desk Chair", category: "Furniture", price: 199.99, stock: 25 },
      {
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 79.99,
        stock: 80,
      },
    ],
  },
];
