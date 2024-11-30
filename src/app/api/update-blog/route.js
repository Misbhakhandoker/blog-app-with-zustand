import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import Zod from "zod";

const EditBlog = Zod.object({
  title: Zod.string().nonempty(),
  description: Zod.string().nonempty(),
});

export async function PUT(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogID = searchParams.get("id");

    if (!getCurrentBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }
    const { title, description } = await req.json();
    const { error } = EditBlog.safeParse({
      title,
      description,
    });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.errors,
      });
    }
    const updateBlogByID = await Blog.findOneAndUpdate(
      { _id: getCurrentBlogID },
      { title, description },
      { new: true }
    );
    if (updateBlogByID) {
      return NextResponse.json({
        success: true,
        message: "Blog updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to update blog",
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
