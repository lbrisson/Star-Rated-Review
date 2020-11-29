import * as Yup from "yup";

const StarRatedReviewFormSchema = Yup.object().shape({
  subject: Yup.string()
    .min(4, "Too Short")
    .max(50, "Too Long")
    .required("Topic Name Required"),
    text: Yup.string()
    .max(3000, "Comment too long")
    .required("Comment Required..."),
    rating: Yup.number().required("Required"),

});

export default StarRatedReviewFormSchema;
