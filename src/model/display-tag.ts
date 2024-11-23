import mongoose, { Schema } from "mongoose";

const displayTagSchema = new Schema(
  {
    slug: { type: String, required: true },
    img_url: { type: String, required: true },
    label: { type: String, required: true },
  },
  {
    collection: "product_display_tag",
  }
);
const DisplayTag = mongoose.model("display_tag", displayTagSchema);
export default DisplayTag;
