import { createClient } from "@supabase/supabase-js";

const url = "https://xaezbcwztkcrkmtakkfg.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZXpiY3d6dGtjcmttdGFra2ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjY5MzAsImV4cCI6MjA3MTcwMjkzMH0.PIx8dU3hai9B57bY8oqXBCwjzLOSFNj9lvZtye97Oy0";

const supabase = createClient(url, key);

export default function uploadFile(file){
  const promise = new Promise(
    (resolve, reject) => {
      if(!file){
        reject("No file provided");
        return;
      }

      const timeStamp = new Date().getTime();
      const fileName = timeStamp+"-"+ file.name;

      supabase.storage.from("skyrek-img").upload(fileName, file,{
        cacheControl: "3600",
        upsert: false

      }).then(
        () => {

          const publicUrl = supabase.storage.from("skyrek-img").getPublicUrl(fileName).data.publicUrl;
          resolve(publicUrl);

        }
      ).catch(
        () => {
          reject("Failed to upload file");
        }
      )

    }
  )
  return promise;
}