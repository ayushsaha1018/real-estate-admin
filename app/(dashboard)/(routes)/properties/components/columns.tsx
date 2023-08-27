"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-action";

export type PropertyColumn = {
  id: string;
  name: string;
  location: string;
  createdAt: string;
};

export const columns: ColumnDef<PropertyColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
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
