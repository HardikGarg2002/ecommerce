import Tag from "../model/tag";

export async function create(tag: any) {
  const newTag = new Tag(tag);
  return await newTag.save();
}

export async function get() {
  return await Tag.find();
}

export async function getById(tagId: string) {
  const tag = await Tag.findById(tagId);
  if (!tag) {
    throw new Error("Tag not found");
  }
  return tag;
}
