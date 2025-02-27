"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDocs, query, where } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig"; 

export default function Workout() {
    const [username, setUsername] = useState("");
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-xl"> 
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">Workout</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <Label className="text-sm font-medium">Display Name</Label>
                        <Input 
                            type="text" 
                            placeholder="Enter username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}