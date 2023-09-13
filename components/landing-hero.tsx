"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import Icon1 from "/public/test2.svg";
import styles from "./landing-hero.module.css"

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold top-0 text-center space-y-5">
      <div className={styles.floatingSvg}>
        <Icon1 />
      </div>
      <div className="relative bottom-80 text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Focus on yourself</h1>
        <div className="text-transparent pb-2 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Sorting it out.",
                "Understand it.",
                "overtake it",
                "set free."
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="relative bottom-80 text-sm md:text-xl font-light text-zinc-200">
        NAISEI supports psychological wellbeing.
      </div>
      <div className="relative bottom-80">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="getStart" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            You can start for free.
          </Button>
        </Link>
      </div>
      <div className="relative bottom-80 text-zinc-200 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};
