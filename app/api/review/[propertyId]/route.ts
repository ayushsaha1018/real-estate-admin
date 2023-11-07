import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
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
    const body = await req.json();

    const { name, email, description, rating } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.propertyId) {
      return new NextResponse("propertyId is required", { status: 400 });
    }

    if (email) {
      return new NextResponse("email is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("description are required", { status: 400 });
    }

    if (!rating) {
      return new NextResponse("rating are required", { status: 400 });
    }

    const review = await prismadb.review.create({
      data: {
        propertyId: params.propertyId,
        name,
        email,
        description,
        rating,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log("[REVIEW_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

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

    const review = await prismadb.review.findMany({
      where: {
        propertyId: params.propertyId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log("[REVIEW_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
