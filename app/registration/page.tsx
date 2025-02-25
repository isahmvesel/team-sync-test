"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDocs, query, where } from "firebase/firestore"; // Import Firestore functions
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig"; 

export default function Register() {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!email.trim()) {
      alert("Email cannot be blank.");
      return;
    }    
    try {

      // Check if email already exists in the Firestore database
      const userQuery = query(collection(db, "User"), where("email", "==", email));
      const querySnapshot = await getDocs(userQuery);
      alert("in heree");

      if (!querySnapshot.empty) {
        // Email already exists
        alert("Email is already registered. Please use a different email.");
        return;
      }

      /* profile picture send to database (TODO, DOESNT WORK RIGHT NOW)*/
      /*
      let profilePictureURL = "";
      if (profilePicture) {
        try {
          const storage = getStorage(); // Initialize storage
          const storageRef = ref(storage, `profile_pictures/${profilePicture.name}`); // File path
          
          alert("Uploading...");
          alert("Uploading file: " + profilePicture.name);

          await uploadBytes(storageRef, profilePicture); // Upload file
          alert("upload complete");

          profilePictureURL = await getDownloadURL(storageRef); // Get file URL
          alert("got here");
        } catch (error) {
          console.error("Error uploading profile picture:", error);
          alert("Failed to upload profile picture.");
          return;
        }
      }
      */
      /* email, username, password send to database */

      const docRef = await addDoc(collection(db, "User"), {
        email: email,
        username: username,
        password: password,
      });    

      // reset form fields
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setProfilePicture(null);

      /* redirect to profile page*/

      alert(`Email Registered: ${email}, username: ${username}`);
      window.location.href = "/profile";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Register</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Username */}
          <div className="mb-4">
            <Label className="text-sm font-medium">Email</Label>
            <Input 
              type="text" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Display Name */}
          <div className="mb-4">
            <Label className="text-sm font-medium">Display Name</Label>
            <Input 
              type="text" 
              placeholder="Enter username name" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="text-sm font-medium">Password</Label>
            <Input 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <Label className="text-sm font-medium">Confirm Password</Label>
            <Input 
              type="password" 
              placeholder="Confirm password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Profile Picture Upload */}

          <div className="mb-4 flex flex-col items-center">
            <Label className="text-sm font-medium">Profile Picture</Label>
            <Input 
              type="file"
              accept="image/*"
              className="mt-2" 
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProfilePicture(e.target.files[0]); // Save the file in state
                }
              }} 
              />
              
          </div>

          {/* Register Button */}
          <Button 
            onClick={handleRegister} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
          >
            Register
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}