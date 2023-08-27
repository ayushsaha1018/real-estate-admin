import prismadb from "@/lib/prismadb";
import { PropertyForm } from "./components/property-form";

const BillboardPage = async ({
  params,
}: {
  params: {
    propertyId: string;
  };
}) => {
  let property = null;
  try {
    property = await prismadb.property.findUnique({
      where: {
        id: params.propertyId,
      },
    });
  } catch (error) {}

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PropertyForm initialData={property} />
      </div>
    </div>
  );
};

export default BillboardPage;
