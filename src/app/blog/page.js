import BlogOverview from "@/components/blog-overview";

async function fetchBlogList() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blog", {
      method: "GET",
      cache: "no-store",
    });
    const result = await apiResponse.json();
    return result?.data;
  } catch (error) {
    console.log(error);
  }
}



async function BlogPage() {
  const blogList = await fetchBlogList();
  console.log(blogList);

  return (
    <div>
      <BlogOverview blogList={blogList} />
    </div>
  );
}

export default BlogPage;
