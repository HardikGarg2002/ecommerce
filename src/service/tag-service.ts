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

export async function patch(tagId: string, tagInput: any): Promise<void> {
  await Tag.findByIdAndUpdate(tagId, tagInput);
}

export async function remove(tagId: string): Promise<void> {
  await Tag.findByIdAndDelete(tagId);
}

export async function patchStatus(
  tagId: string,
  status: boolean
): Promise<void> {
  await Tag.findByIdAndUpdate(tagId, {
    is_active: status,
  });
}
