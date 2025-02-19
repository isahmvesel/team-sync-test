"use client"
import Image from "next/image";
import Link from 'next/link';
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { auth } from "../app/Firebase/config";


export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //const auth = getAuth();

  const changeUsernameInput = (e) => {
    setUsername(e.target.value);
  }

  const changePasswordInput = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = async () => {
    try {
      console.log('trying login | USER:' + username + "@dummydomain.com | PASSWORD:" + password + "\n");
      const response = await fetch( "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      await signInWithEmailAndPassword(auth, username + "@dummydomain.com", password);
      console.log('User signed in: ' + { username, password });
      //TODO: Bind calendar page navigation to successful login, 
    } catch (err: any) {
      setError(err.message);
      console.log('login failed\n');
      //TODO: Display error message on fail
    }
  }

  return (
    <div className="bg-[rgb(230,230,230)] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
          <h1 className="text-black text-center text-5xl underline text-bold">Team Sync</h1>

        <ul className="list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="text-black mb-2 flex items-center gap-2" >
            <span>Username:</span>
            <input
            type="text"
            style={{ backgroundColor: "rgb(180, 180, 180)" , borderColor: "rgb(100, 100, 100)"}}
            className="border rounded px-2 py-1 text-black placeholder-[rgb(70,70,70)]"
            placeholder="Enter username"
            value={username}
            onChange={changeUsernameInput}
          />
          </li>

          <li className="text-black mb-2 flex items-center gap-2" >
            <span>Password:</span>
            <input
            type="text"
            style={{ backgroundColor: "rgb(180, 180, 180)" , borderColor: "rgb(100, 100, 100)"}}
            className="border rounded px-2 py-1 text-black placeholder-[rgb(70,70,70)]"
            placeholder="Enter password"
            value={password}
            onChange={changePasswordInput}
          />
          </li>
        </ul>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-black/[.70] text-black transition-colors flex items-center justify-center hover:bg-[#f2f2f2] hover:text-[#ffffff] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-28"
            href="/Calendar"
            //target="_blank"
            rel="noopener noreferrer"
            onClick={handleLogin}
          >
            <Image
              className="dark:invert mr-2"
              src="/globe.svg"
              alt="globe"
              width={20}
              height={20}
            />
            Log in
          </a>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-black/[.70] text-black transition-colors flex items-center justify-center hover:bg-[#f2f2f2] hover:text-[#ffffff] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/Register"
            //target="_blank"
            rel="noopener noreferrer"
          >
            Sign up
          </Link>
        </div>
      </main>
      
    </div>
  );
}
