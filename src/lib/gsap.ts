"use client";

import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsap() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger, Flip);
  registered = true;
}

export { gsap, ScrollTrigger, Flip };
