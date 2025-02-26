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

    
}