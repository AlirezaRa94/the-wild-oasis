import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName: fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

async function uploadAvatar(avatar, data) {
  const name = `avatar-${data.user.id}-${Math.random()
    .toString(36)
    .substring(6)}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(name, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const path = `${supabaseUrl}/storage/v1/object/public/avatars/${name}`;

  return path;
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  // 1. Update password OR update fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // 2. Upload avatar if it is provided
  const avatarPath = await uploadAvatar(avatar, data);

  // 3. Update avatar URL in the user
  const { data: updatedUserData, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: avatarPath,
      },
    });

  if (avatarError) {
    throw new Error(avatarError.message);
  }

  return updatedUserData;
}
