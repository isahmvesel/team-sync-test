"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Register() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    }
  };

  // Handle registration logic
  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`User Registered: ${username}, Display Name: ${displayName}`);
    // TODO: Send data to Firebase here
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
            <Label className="text-sm font-medium">Username</Label>
            <Input 
              type="text" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Display Name */}
          <div className="mb-4">
            <Label className="text-sm font-medium">Display Name</Label>
            <Input 
              type="text" 
              placeholder="Enter display name" 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)}
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
            <Input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
            
            {/* Avatar Preview */}
            {profilePicture && (
              <Avatar className="mt-2 w-20 h-20">
                <AvatarImage src={URL.createObjectURL(profilePicture)} />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
            )}
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