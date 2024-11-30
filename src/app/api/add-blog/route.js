import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import zod from "zod";

const AddNewBlog = zod.object({
  title: zod.string().nonempty("Title is required"),
  description: zod.string().nonempty("Description is required"),
});

export async function POST(req) {
  try {
    await connectToDB();
    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;
    const {error} = AddNewBlog.safeParse({
      title,
      description,
    });
    if (error) {
      console.error(validation.error.errors);
      return NextResponse.json({
        success: false,
        message: error.errors
      })
    }
    const newlyCreateBlogItem = await Blog.create(extractBlogData);
    if (newlyCreateBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog created successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to create blog",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
