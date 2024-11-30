"use client";
import useBlogFormStore from "@/store/use-blog";
import { useRouter } from "next/navigation";
import AddNewBlog from "../add-blog";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
// const initialFormData = {
//   title: "",
//   description: "",
// };

function BlogOverview({ blogList }) {
  const { handleDeleteBlog, handleEditBlog } = useBlogFormStore();
  const router = useRouter();

  // async function handleSaveBlog() {
  //   try {
  //     console.log(blogFormData);
  //     setLoading(true)
  //     const apiResponse = currentEditedBlogID !== null ? await fetch(`/api/update-blog?id=${currentEditedBlogID}`,{
  //       method:"PUT",
  //       body: JSON.stringify(blogFormData)
  //     }) :  await fetch(`/api/add-blog`, {
  //       method: "POST",
  //       body: JSON.stringify(blogFormData),
  //     });
  //     const result = await apiResponse.json();
  //     if (result?.success) {
  //       setBlogFormData(initialFormData);
  //       setOpenBlogDialog(false);
  //       setLoading(false)
  //       setCurrentEditedBlogID(null)
  //       router.refresh();
  //     }
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false)
  //     setBlogFormData(initialFormData);
  //   }
  // }

  // async function handleDeleteBlog(currentBlogId) {
  //   try {
  //     const apiResponse = await fetch(`/api/delete-blog?id=${currentBlogId}`, {
  //       method: "DELETE",
  //     });
  //     const result = await apiResponse.json();
  //     if (result?.success) router.refresh();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // function handleEditBlog(getCurrentBlog) {
  //   console.log(getCurrentBlog);
  //   setCurrentEditedBlogID(getCurrentBlog._id);
  //   setBlogFormData({
  //     title: getCurrentBlog?.title,
  //     description: getCurrentBlog?.description,
  //   });
  //   setOpenBlogDialog(true);
  // }

  return (
    <div className="p-5">
      <AddNewBlog router={router} />
      <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 lg:gird-cols-3">
        {blogList && blogList.length > 0 ? (
          blogList.map((blogItem) => (
            <div key={blogItem._id}>
              <Card className="p-5">
                <CardHeader>
                  <CardTitle className="flex flex-col justify-between gap-5 mb-5 md:flex-row">
                   <h2 className="text-2xl">{blogItem.title}</h2> 
                    <span className="text-sm text-gray-500 ">{blogItem.description}</span>
                  </CardTitle>
                </CardHeader>
                <CardDescription>
                  <div className="flex items-center gap-5 mt-5">
                    <Button onClick={() => handleEditBlog(blogItem)}>
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteBlog(blogItem._id, router)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardDescription>
              </Card>
            </div>
          ))
        ) : (
          <h3>Blog Not Fount</h3>
        )}
      </div>
    </div>
  );
}

export default BlogOverview;
