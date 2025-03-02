"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDocs, query, where } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig"; 
import { useRouter, useSearchParams } from "next/navigation";

interface Exercise {
    name: string;
    reps: string;
    sets: string;
    time: string;
  }

export default function Workout() {
    const [workoutName, setWorkoutName] = useState("Workout Name");
    const [description, setDescription] = useState("Workout Description");
    const [exercises, setExercises] = useState([{ name: "", reps: "", sets: "", time: "" }]);

    const router = useRouter();
    const docId = useSearchParams().get("docId"); // Get the event docId from the URL

    const handleSaveWorkout = async () => {
        try {
            await addDoc(collection(db, "Workouts"), {
                name: workoutName,
                description: description,
                //exercises: exercises,
            });

            alert("Workout saved successfully!");
            //router.push(`/workout/view?docId=${eventDocRef.id}`);
        } catch (error) {
            console.error("Error saving workout", error);
            alert("There was an error saving the workout.");
        }
    };

    const handleWorkoutNameChange = (e) => {
        setWorkoutName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };


    const handleExerciseChange = (index: number, field: keyof Exercise, value: string) => {
        const newExercises = [...exercises];
        newExercises[index][field] = value;
        setExercises(newExercises);
      };

    const handleAddExercise = () => {
        setExercises([...exercises, { name: "", reps: "", sets: "", time: "" }]);
    };

    const handleRemoveExercise = () => {
        if (exercises.length > 1) {
            const newExercises = exercises.slice(0, -1);
            setExercises(newExercises);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-lg p-6 shadow-lg bg-white rounded-xl">

            {/* Workout Name */}
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Workout Name"
                        onChange={handleWorkoutNameChange}  // Handle change
                        className="flex-grow font-semibold text-lg bg-gray-100 p-2 rounded-md"
                    />
                </div>
            </CardHeader>
            <CardContent>

                {/* Workout Description */}
                <div className="mb-4">
                        <Textarea
                            placeholder="Description"
                            onChange={handleDescriptionChange} // Handle change for description
                            className="w-full h-24 bg-gray-100 p-2 rounded-md"
                        />
                </div>

                {/* Exercise */}
                <div>
                        <h3 className="text-lg font-semibold mb-2">Exercises</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {exercises.map((exercise, index) => (
                                <div key={index}>
                                    <Input
                                        placeholder="Exercise Name" 
                                        value={exercise.name}
                                        onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Reps"
                                        value={exercise.reps}
                                        onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Sets"
                                        value={exercise.sets}
                                        onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Time (min)"
                                        value={exercise.time}
                                        onChange={(e) => handleExerciseChange(index, "time", e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                        <Button className="mt-2" onClick={handleAddExercise}>
                            Add Exercise
                        </Button>
                        <Button onClick={handleRemoveExercise} className="bg-red-500 hover:bg-red-600">
                                Remove Exercise
                        </Button>
                    </div>
            </CardContent>
            <Button onClick={handleSaveWorkout} className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
                    Save Workout
                </Button>
        </Card>
    </div>
    );
}