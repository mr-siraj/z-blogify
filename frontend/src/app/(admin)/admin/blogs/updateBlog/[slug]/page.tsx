import { API as axios } from "@/axios";
import { BlogDataTypes } from "@/types";
import { AxiosError } from "axios";
import {} from "react";
import UpdateBlogBySlug from "./components/updateBLogBySlug/UpdateBlogByslug";
import { redirect } from "next/navigation";

interface SlugTypes {
  slug: string;
}
const fetchSingleBlog = async (slug: string) => {
  try {
    const response = await axios.get(`/blogs/getSingleBlog/${slug}`);
    if (response.status !== 200) {
      return redirect("/admin/blogs/privateBlogs");
    }
    return response.data;
  } catch (error: any) {
    const err = error as AxiosError;
    return err.status;
  }
};
async function Slug({ params }: { params: SlugTypes }) {
  const { slug } = params;
  const data: BlogDataTypes = await fetchSingleBlog(slug);
  if (!data) return redirect("/admin/blogs/privateBlogs");
  return (
    <section className="mx-5">
      <UpdateBlogBySlug oldSlug={slug} oldData={data} />
    </section>
  );
}

export default Slug;
