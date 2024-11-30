import useBlogFormStore from "@/store/use-blog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function AddNewBlog({router}) {
  const {
    openBlogDialog,
    setOpenBlogDialog,
    blogFormData,
    setBlogFormData,
    currentEditedBlogID,
    Loading,
    handleSaveBlog,
    initialFormData
  } = useBlogFormStore();
  
  return (
    <div>
      <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
      <Dialog
        open={openBlogDialog}
        onOpenChange={() => {
          setOpenBlogDialog(false);
          setBlogFormData(initialFormData);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditedBlogID ? "Edit Blog" : "Add New Blog"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={blogFormData.title}
                name="title"
                className="col-span-3"
                onChange={(e) =>
                  setBlogFormData({ ...blogFormData, title: e.target.value })
                }
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={blogFormData.description}
                name="description"
                className="col-span-3"
                onChange={(e) =>
                  setBlogFormData({
                    ...blogFormData,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={()=> handleSaveBlog(router)} type="button">
              {Loading ? "Saving changes" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewBlog;
