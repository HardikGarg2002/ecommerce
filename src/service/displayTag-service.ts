import DisplayTag from "../model/display-tag";

export async function create(displayTag: any) {
  const newDisplayTag = new DisplayTag(displayTag);
  return await newDisplayTag.save();
}

export async function get() {
  const displayTags = await DisplayTag.find();
  return displayTags;
}
