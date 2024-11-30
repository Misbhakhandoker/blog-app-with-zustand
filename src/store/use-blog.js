const { create } = require("zustand");

const useBlogFormStore = create((set, get) => ({
  openBlogDialog: false,
  blogFormData: {},
  currentEditedBlogID: null,
  loading: false,
  initialFormData: { title: "", description: "" },
  // actions
  setOpenBlogDialog: (isOpen) => set({ openBlogDialog: isOpen }),
  setBlogFormData: (fromData) => set({ blogFormData: fromData }),
  setCurrentEditedBlogID: (id) => set({ currentEditedBlogID: id }),
  setLoading: (isLoading) => set({ loading: isLoading }),

  handleSaveBlog: async (router) => {
    const {
      blogFormData,
      currentEditedBlogID,
      setBlogFormData,
      setLoading,
      setOpenBlogDialog,
      setCurrentEditedBlogID,
      initialFormData,
    } = get();
    try {
      setLoading(true);
      const apiResponse =
        currentEditedBlogID !== null
          ? await fetch(`/api/update-blog?id=${currentEditedBlogID}`, {
              method: "PUT",
              body: JSON.stringify(blogFormData),
            })
          : await fetch(`/api/add-blog`, {
              method: "POST",
              body: JSON.stringify(blogFormData),
            });
      const result = await apiResponse.json();
      if (result?.success) {
        setBlogFormData(initialFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        setCurrentEditedBlogID(null);
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialFormData);
    }
  },
  handleDeleteBlog: async (getCurrentBlogID, router) => {
    try {
      const apiResponse = await fetch(
        `/api/delete-blog?id=${getCurrentBlogID}`,
        {
          method: "DELETE",
        }
      );
      const result = await apiResponse.json();
      if (result?.success) router.refresh();
    } catch (error) {
      console.log(error);
    }
  },
  handleEditBlog: async (getCurrentBlog) => {
    const { setBlogFormData, setCurrentEditedBlogID, setOpenBlogDialog } =
      get();

    setCurrentEditedBlogID(getCurrentBlog._id);
    setBlogFormData({
      title: getCurrentBlog?.title,
      description: getCurrentBlog?.description,
    });
    setOpenBlogDialog(true);
  },
}));
export default useBlogFormStore;
