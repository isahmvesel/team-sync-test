"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDocs, query, where } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig"; 

export default function Workout() {
    const [workoutName, setWorkoutName] = useState("Workout Name");
    const [description, setDescription] = useState("Workout Description");
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-lg p-6 shadow-lg bg-white rounded-xl">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Input 
                        type="text" 
                        value={workoutName} 
                        className="flex-grow font-semibold text-lg bg-gray-100 p-2 rounded-md" 
                        readOnly 
                    />
                    <Button>Edit</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Textarea 
                        value={description} 
                        className="w-full h-24 bg-gray-100 p-2 rounded-md" 
                        readOnly 
                    />
                    <Button className="mt-2">Edit</Button>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Exercises</h3>
                    <div className="grid grid-cols-4 gap-2">
                        <Input placeholder="Exercise Name" />
                        <Input placeholder="Reps" />
                        <Input placeholder="Sets" />
                        <Input placeholder="Time (min)" />
                    </div>
                    <Button className="mt-2">Add Exercise</Button>
                </div>
            </CardContent>
        </Card>
    </div>
    );
}