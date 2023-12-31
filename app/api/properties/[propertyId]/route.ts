import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      propertyId: string;
    };
  }
) {
  try {
    if (!params.propertyId) {
      return new NextResponse("propertyId is required", { status: 400 });
    }

    const property = await prismadb.property.findUnique({
      where: {
        id: params.propertyId,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.log("[PROPERTY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      propertyId: string;
    };
  }
) {
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

    const property = await prismadb.property.updateMany({
      where: {
        id: params.propertyId,
      },
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
    console.log("[PROPERTY_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      propertyId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.propertyId) {
      return new NextResponse("propertyId is required", { status: 400 });
    }

    const property = await prismadb.property.deleteMany({
      where: {
        id: params.propertyId,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.log("[PROPERTY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
