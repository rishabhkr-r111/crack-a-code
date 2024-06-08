"use client"
import { Button } from "@/components/ui/button"
import  Navbar  from "./components/Navbar/Navbar"
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [displayedText, setDisplayedText] = useState('_');
  const [index, setIndex] = useState(0);
  const text = 'Learn, Code, Crack.';

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 150); 
      return () => clearTimeout(timeoutId);
    }
  }, [index, text]);
  return (
    <main>
      <div className="flex flex-col justify-center items-center gap-7 mt-11">
      <div className="text-8xl text-center font-mono text-gray-800 border-r-2 border-gray-800 pr-2 animate-cursor">
        {displayedText}
      </div>
      <div className="text-9xl text-center font-brick text-green-800">
        Crack A Code_
      </div>
          <Link href={"/contests"} className="flex gap-2 w-1/4 bg-gray-800 text-white rounded-2xl mt-5 p-3 items-center justify-center hover:bg-black">Get Started <ArrowRight /> </Link>
      </div>
    </main>
  );
}
