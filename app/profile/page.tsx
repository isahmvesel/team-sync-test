"use client";

import { useState, useEffect } from "react";

export default function Profile() {
  const [userId, setUserId] = useState("testid"); 
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const fetchProfileImage = async () => {
    try {
      const res = await fetch(`/api/getProfileImage?userId=${userId}`);
      const data = await res.json();
      if (res.ok && data.file) {
        const timestamp = new Date().getTime();
        setPreview(`/uploads/${data.file}?timestamp=${timestamp}`);
      } else {
        setPreview("/default-profile.jpg");
      }
    } catch {
      setPreview("/default-profile.jpg");
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, [userId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) return alert("Please select an image!");
    setUploading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(`/api/upload?userId=${userId}`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Upload successful!");
        fetchProfileImage();
      } else {
        const errorData = await res.json();
        alert(`Upload failed! ${errorData.error || "Unknown error"}`);
      }
    } catch {
      alert("Upload failed! Network error.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Profile Page</h1>
      <h2>User ID: {userId}</h2>
      <img
        src={preview}
        alt="Profile"
        width="200"
        style={{
          borderRadius: "10px",
          objectFit: "cover",
          border: "2px solid #ccc",
        }}
        onError={(e) => (e.currentTarget.src = "/default-profile.jpg")}
      />
      <form onSubmit={handleUpload} style={{ marginTop: "20px" }}>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
}
