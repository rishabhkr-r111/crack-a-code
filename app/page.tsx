"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import CodeBox from "./components/CodeBox";
import Footer from "./components/Footer";

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
      <div className="text-8xl text-center font-mono text-gray-500 border-r-2 border-gray-500 pr-2 animate-cursor">
        {displayedText}
      </div>
      <div className="text-9xl text-center font-brick text-green-800">
        Crack A Code_
      </div>
          <Link href={"/contests"} className="flex gap-2 w-1/4 bg-gray-800 text-white rounded-2xl mt-5 p-3 items-center font-mono justify-center hover:bg-black">Let&#39;s Get Coding! <ArrowRight /> </Link>
      </div>
      <div className="mt-12 flex justify-center items-center space-x-20">
        <div className="text-3xl font-mono w-1/2"> Learn In The Most Exciting Way! 
        <div className="text-xl font-mono text-gray-500 mt-2"> Discover knowledge through engaging, interactive, and immersive learning experiences! </div>
        <div className="text-x1 font-mono text-gray-400 mt-2">With abundance of features, one will never get bored to hustle in the field of competitve coding!</div>
        </div>
        <div> <Image src="\CAC_CpmpIcon.svg" alt="." width={"300"} height={"300"}></Image> </div>
      </div>
      <div>
        <CodeBox />
      </div>
      <div className="mt-12 flex justify-center items-center gap-2 space-x-3 mx-10">
        <div className="text-2xl font-mono w-1/3"> Success is not final,  
        <div className="text-sm font-mono text-gray-500 mt-2"> Failure is not fatal. Its the effort that you put, that counts!

          With interesting pathways and uncompromising challenges, every effort that you put in your effort-laden coding journey counts!

          Introducing, points system 
          For every hard-earned successful test case, we assign points to every coder.
          With these points, unlock new pathways and win more! </div>
                  </div>

        <div className="text-2xl font-mono w-1/3"> Once is not enough, buddy!   
        <div className="text-sm font-mono text-gray-500 mt-2"> Keep trying till the very end. Its the effort that you put, that counts!

          We provide our users with multiple problem statements, to make sure they are exposed to every kind of problem that life throws at them.

          Introducing, levels of difficulty! 
          With every level of questions conquered succesfully,
          one can assure his or her preparedness for facing challenges out there! </div>
                  </div>

         <div className="text-2xl font-mono w-1/3 "> You&#39;re not alone! We&#39;re with ya!
        <div className="text-sm font-mono text-gray-500 mt-2"> 

          One can never wonder when and how life throws a grenade of troubles at them. Many expect their loved ones to shine bright amidst troubled times.

          Introducing, live error analysis and admin observation. 
          Errors can be very troublesome, especially when there are multiple lines of code.
          To make sure you are up to speed with the faults you make after completing the code, this exclusive feature can be your one stop solution! 
          </div>
        </div>

      </div>

     
      
     <Footer /> 
    </main>
  );
}
