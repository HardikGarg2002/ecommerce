import DisplayTag from "../model/display-tag";

async function createDisplayTag(displayTag: any) {
  try {
    const newDisplayTag = new DisplayTag(displayTag);
    return await newDisplayTag.save();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function getAllDisplayTags() {
  try {
    const displayTags = await DisplayTag.find();
    return displayTags;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export { createDisplayTag, getAllDisplayTags };
