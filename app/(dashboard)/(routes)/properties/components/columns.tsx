"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-action";

export type PropertyColumn = {
  id: string;
  name: string;
  address: string;
  price: string;
  isAvailable: boolean;
  createdAt: string;
};

export const columns: ColumnDef<PropertyColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row: { original } }) => <p>&#8377; {original.price}</p>,
  },
  {
    accessorKey: "isAvailable",
    header: "Available",
    cell: ({ row: { original } }) => (
      <p>{original.isAvailable ? "Yes" : "No"}</p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
