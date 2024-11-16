import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

async function uploadCabinImage(image) {
  const name = `${Math.random().toString(36).substring(6)}-${image.name}`
    .replaceAll(" ", "-")
    .replaceAll("/", "");

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(name, image);

  if (storageError) {
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded");
  }

  const path = `${supabaseUrl}/storage/v1/object/public/cabin-images/${name}`;

  return { path, name };
}

export async function createCabin(newCabin) {
  // 1. Upload the image to the storage bucket
  const { path: imagePath, name: imageName } = await uploadCabinImage(
    newCabin.image
  );

  // 2. Create a new cabin record with the image path
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  // 3. If there was an error creating the cabin, delete the image from the storage bucket
  if (error) {
    supabase.storage.from("cabin-images").remove([imageName]);
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  return data;
}

export async function updateCabin(newCabinData, id) {
  const hasNewImage = typeof newCabinData.image !== "string";

  // 1. If the cabin has a new image, upload it to the storage bucket
  let imageData = {};
  if (hasNewImage) {
    imageData = await uploadCabinImage(newCabinData.image);
    newCabinData.image = imageData.path;
  }

  // 2. Update the cabin record with the new data
  const { data, error } = await supabase
    .from("cabins")
    .update(newCabinData)
    .eq("id", id)
    .select()
    .single();

  // 3. If there was an error updating the cabin, delete the new image from the storage bucket
  if (error) {
    if (hasNewImage) {
      supabase.storage.from("cabin-images").remove([imageData.name]);
    }
    console.error(error);
    throw new Error("Cabin could not be updated");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return id;
}
