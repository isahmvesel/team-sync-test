"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../utils/firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import { setDocument, viewDocument } from "../../utils/firebaseHelper.js";

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
      const userDoc = await viewDocument("Users", userId);
      if (userDoc) {
        setUserData(userDoc);
      }
    };
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchProfileImage = async () => {
    try {
      const res = await fetch(`/api/getProfileImage?userId=${userId}`);
      const data = await res.json();
      if (res.ok && data.file) {
        setPreview(`/uploads/${data.file}?timestamp=${Date.now()}`);
      }
    } catch (error: any) {
      alert(`Error fetching profile image: ${error.message || "Unknown error"}`);
      setPreview("/default-profile.jpg");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfileImage();
    }
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
    } catch (error: any) {
      alert(`Upload failed! ${error.message || "Unknown error"}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Profile Page</h1>
      <div style={{ marginBottom: "20px" }}>
        <img
          src={preview}
          alt="Profile"
          width="200"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ccc",
          }}
          onError={(e) => (e.currentTarget.src = "/default-profile.jpg")}
        />
      </div>
      <h2 style={{ marginBottom: "10px" }}>User ID: {userId}</h2>
      <p style={{ margin: "5px 0" }}>
        <strong>Email:</strong> {userData.email}
      </p>
      <p style={{ margin: "5px 0" }}>
        <strong>Username:</strong> {userData.name}
      </p>
      <form onSubmit={handleUpload} style={{ marginTop: "20px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          style={{ marginBottom: "10px" }}
        />
        <br />
        <button
          type="submit"
          disabled={uploading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
}
