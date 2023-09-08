import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      address,
      images,
      videos,
      frontSize,
      depthSize,
      totalSize,
      about,
      price,
      isAvailable,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!address) {
      return new NextResponse("Location is required", { status: 400 });
    }

    if (images.length < 1) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!frontSize) {
      return new NextResponse("frontSize are required", { status: 400 });
    }

    if (!depthSize) {
      return new NextResponse("depthSize are required", { status: 400 });
    }

    if (!totalSize) {
      return new NextResponse("totalSize are required", { status: 400 });
    }

    if (!about) {
      return new NextResponse("about is required", { status: 400 });
    }

    if (!isAvailable) {
      return new NextResponse("isAvailable is required", { status: 400 });
    }

    const property = await prismadb.property.create({
      data: {
        name,
        address,
        images,
        videos,
        frontSize,
        depthSize,
        price,
        totalSize,
        about,
        isAvailable,
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
    const properties = await prismadb.property.findMany();

    return NextResponse.json(properties);
  } catch (error) {
    console.log("[PROPERTY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
