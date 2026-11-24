"use client";
import {  useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async() => {

    if (!selectedFile) {
      alert("please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      // image upload in cloudinary
      const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/uploads/image`,{
        method:'POST',
        body: formData
      });

      if(!uploadResponse.ok){
        throw new Error('Image Upload failed')

      }

      const uploadData = await uploadResponse.json()


      const studentData = {
        name: 'Mohim',
        class: 'Six',
        section: 'A',
        image: uploadData.imageUrl
      }

      const studentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students`,{
        method:"POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(studentData)
      });

      if (!studentResponse.ok) {
        throw new Error("Student create failed");
      }

      const result = await studentResponse.json()

      console.log(result)
      alert('student created successfully')


    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
    }
  };
  return (
    <div>
      <h1>Welcome to EduConnect.</h1>

      
        <div className="flex bg-amber-100 p-4 rounded-2xl flex-row gap-2">
          <label htmlFor="image">Select an image</label>
          <input
            type="file"
            accept="image/*"
            id="image"
            className="w-full"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <button type="button" onClick={handleSubmit}>Add image</button>
      
    </div>
  );
}
