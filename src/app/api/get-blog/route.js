import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const extractAllBlogFormDatabase = await Blog.find({});
    if (extractAllBlogFormDatabase) {
      return NextResponse.json({
        success: true,
        data: extractAllBlogFormDatabase,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No blog found",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
