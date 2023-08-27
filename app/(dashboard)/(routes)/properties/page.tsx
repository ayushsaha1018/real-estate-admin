import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import PropertyClient from "./components/client";
import { PropertyColumn } from "./components/columns";

const PropertiesPage = async () => {
  const properties = await prismadb.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProperties: PropertyColumn[] = properties.map((item) => ({
    id: item.id,
    name: item.name,
    location: item.location,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PropertyClient data={formattedProperties} />
      </div>
    </div>
  );
};

export default PropertiesPage;
