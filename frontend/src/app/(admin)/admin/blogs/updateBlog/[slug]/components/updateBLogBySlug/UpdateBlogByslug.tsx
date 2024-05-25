"use client";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { AlloweTags } from "@/app/createBlog/helper/toolbar";
import { randomStringGen } from "@/app/helper/randomStringGen/randomStringGen";
import { API as axios } from "@/axios";
import { Button } from "@/components/ui/button";
import { useMessage } from "@/hooks/useMessage";
import { useSlugGenerator as UseSlugGenerator } from "@/hooks/useSlugGenerator";
import { BlogDataTypes } from "@/types";
import Froalaeditor from "froala-editor";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/plugins/code_view.min.css";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/save.min.js";
import parser from "html-react-parser";
import Image from "next/image";
import { useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
function UpdateBlogBySlug({
  oldSlug: slugForUpdate,
  oldData,
}: {
  oldSlug: string;
  oldData: any;
}) {
  const getObjectOfFetchedData: BlogDataTypes = oldData.data;
  const {
    blogAuthor,
    blogDescription,
    blogSlug,
    blogThumbnail,
    blogThumbnailAuthor,
    blogTitle,
  } = getObjectOfFetchedData!;
  const [newDesc, setNewDesc] = useState(() => {
    return blogDescription || localStorage.getItem("savedHtml") || "";
  });

  const { errorMessage, successMessage } = useMessage();
  const [newTitle, setNewTitle] = useState<string>(blogTitle || "");
  const [newSlug, setNewSlug] = useState<string>(blogSlug || "");
  const [isPublic, setIsPublic] = useState<true | false>(false);
  const [newData, setNewData] = useState({
    blogAuthor: blogAuthor || "",
    blogImage: blogThumbnail || "",
    blogImageAuthor: blogThumbnailAuthor || "",
  });
  const handleOnchange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleChangeTitleAndSlug = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const mynewtitle = event.target.value;
    setNewTitle(mynewtitle);
    setNewSlug(UseSlugGenerator(mynewtitle));
  };
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newTitle ||
      !newSlug ||
      !newDesc ||
      !newData.blogAuthor ||
      !newData.blogImageAuthor ||
      !newData.blogImage
    ) {
      return errorMessage("Please Provide all fields");
    }
    const { blogAuthor, blogImage, blogImageAuthor } = newData!;
    const randomString = randomStringGen(20);
    console.log(
      blogAuthor,
      blogImage,
      blogImageAuthor,
      newTitle,
      newDesc,
      isPublic,
      newSlug
    );
    try {
      const response = await axios.patch(`/blogs/updateBlog/${slugForUpdate}`, {
        blogTitle: newTitle,
        blogSlug: `${newSlug}-${randomString}`,
        blogDescription: newDesc,
        blogThumbnail: blogImage,
        blogThumbnailAuthor: blogImageAuthor,
        blogAuthor: blogAuthor,
        isPublic,
      });
      if (response.status === 201) {
        //TODO:remove local storage first before production
        return successMessage("Blog Updated successfully");
      }
    } catch (error: any) {
      console.log(error);
      return errorMessage(error.response.data.message || error.message);
    }
  };
  return (
    <>
      <section className="px-5 py-2">
        <form onSubmit={handleCreateBlog} className="w-full">
          <div className="my-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={newTitle}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleChangeTitleAndSlug}
            />
          </div>
          <div className="my-2">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              name="slug"
              value={newSlug}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleChangeTitleAndSlug}
              readOnly
            />
          </div>
          <div className="my-2">
            <label htmlFor="blogImage">BlogImage</label>
            <input
              id="blogImage"
              type="url"
              name="blogImage"
              value={newData.blogImage}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleOnchange}
            />
          </div>
          <div className="my-2">
            <label htmlFor="BlogImageAuthor">BlogImageAuthor</label>
            <input
              id="BlogImageAuthor"
              type="text"
              name="blogImageAuthor"
              value={newData.blogImageAuthor}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleOnchange}
            />
          </div>
          <div className="my-2">
            <label htmlFor="BlogAuthorName">BlogAuthorName</label>
            <input
              id="BlogAuthorName"
              type="text"
              name="blogAuthor"
              value={newData.blogAuthor}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleOnchange}
            />
          </div>
          <div className="my-2">
            <label htmlFor="ispublic" className="font-bold text-2xl">
              ISPUBLIC
            </label>
            <input
              id="ispublic"
              type="checkbox"
              name="blogAuthor"
              checked={isPublic}
              className="mx-4"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsPublic(event.target.checked);
              }}
            />
          </div>

          <div />
          <label htmlFor="">Blog Description</label>
          <div className="relative h-fit overflow-hidden my-4">
            <FroalaEditor
              model={newDesc}
              onModelChange={(e: string) => setNewDesc(e)}
              config={{
                placeholderText: "Start from the here ",
                saveInterval: 2000,
                charCounterCount: true,
                enter: Froalaeditor.ENTER_BR,
                htmlAllowedTags: AlloweTags,
                htmlUntouched: true,
                events: {
                  "save.before": function (html: string) {
                    localStorage.setItem("savedHtml", html);
                  },
                },
              }}
            />
            <div className=" bg-white absolute bottom-4 h-[20px] w-full max-w-4xl" />
          </div>
          <div className="flex justify-end w-full px-5">
            <Button className="">Update Blog</Button>
          </div>
        </form>
        <PageWrapper className="my-5 p-4 md:max-w-[920px]">
          <h1 className="text-center font-bold text-2xl md:text-4xl my-4 text-balance">
            {newTitle}
          </h1>
          <div className="w-fit mx-auto my-4">
            <Image
              src={newData.blogImage}
              alt={newData.blogImageAuthor}
              width={920}
              height={920}
            />
          </div>
          <div className="text-left w-full text-lg">{parser(newDesc)}</div>
        </PageWrapper>
      </section>
    </>
  );
}

export default UpdateBlogBySlug;
