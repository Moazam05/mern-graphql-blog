import * as Yup from "yup";

export const addBlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").nullable(),
  content: Yup.string().required("Content is required").nullable(),
});
