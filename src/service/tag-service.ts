import Tag from "../model/tag";

export async function create(tag: any) {
  const newTag = new Tag(tag);
  return await newTag.save();
}
