import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, location, images } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!location) {
      return new NextResponse("Location is required", { status: 400 });
    }

    if (images.length < 1) {
      return new NextResponse("Images are required", { status: 400 });
    }

    const property = await prismadb.property.create({
      data: {
        name,
        location,
        images,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.log("[PROPERTY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const propterties = await prismadb.property.findMany();

    return NextResponse.json(propterties);
  } catch (error) {
    console.log("[PROPERTY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
