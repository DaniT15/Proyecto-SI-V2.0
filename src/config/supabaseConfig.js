import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eggykcrwwrqpsodakecr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZ3lrY3J3d3JxcHNvZGFrZWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNTQxNjksImV4cCI6MjA1NzkzMDE2OX0.cGq3Hqnv2qJshifO47LUsnzL3AtAAYmq8ei9ZOKgKNA";

const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase };
export const uploadImage = async (file, bucket, folder) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2, 15)}_${Date.now()}.${fileExt}`;

    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};