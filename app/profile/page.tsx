"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../utils/firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const [userId, setUserId] = useState("testuser");
  const [userData, setUserData] = useState({ email: "", name: "", password: "" });
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("/default-profile.jpg");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId("testuser");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, "Users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };
    fetchUserData();
  }, [userId]);

  const fetchProfileImage = async () => {
    try {
      const res = await fetch(`/api/getProfileImage?userId=${userId}`);
      const data = await res.json();
      if (res.ok && data.file) {
        setPreview(`/uploads/${data.file}?timestamp=${Date.now()}`);
      }
    } catch (error) {
      alert(`Error fetching profile image: ${error.message || "Unknown error"}`);
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
    if (!image) {
      alert("Please select an image!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(`/api/upload?userId=${userId}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      alert("Upload successful!");
      fetchProfileImage();
    } catch (error) {
      alert(`Upload failed! ${error.message || "Unknown error"}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Profile Page</h1>
      <h2>User ID: {userId}</h2>
      <p>Email: {userData.email}</p>
      <p>Username: {userData.name}</p>
      <img
        src={preview}
        alt="Profile"
        width="200"
        style={{ borderRadius: "10px", objectFit: "cover", border: "2px solid #ccc" }}
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
