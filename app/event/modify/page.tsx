"use client";

import "./event-modify.css"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useState, useEffect } from 'react';
import { db } from '../../../utils/firebaseConfig';
import { collection, 
    addDoc, 
    Timestamp, 
    DocumentData,
    doc,
    getDoc,
} from "firebase/firestore";


export default function ModifyEvent() {

    return (

        <div className="flex items-center justify-center">
            <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">
                        Modify Event
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form>
                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Name</Label>
                            <Input placeholder="original event name" className="mt-1"></Input>
                        </div>

                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Description</Label>
                            <Textarea placeholder="original event description" className="mt-1"></Textarea>
                        </div>

                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Date & Time</Label>
                            <Input type="datetime-local" className="mt-1"></Input>
                        </div>

                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Location</Label>
                            <Input placeholder="original event location" className="mt-1"></Input>
                        </div>
                    </form>
                </CardContent>

                <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all">Cancel</Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all">Save</Button>
                </CardFooter>
            </Card>
        </div>

    );

}
