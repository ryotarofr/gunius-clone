"use client"

import gsap from "gsap"
import React, { useEffect, useRef } from "react"

export const CustomCursor = () => {
  const $follower = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo($follower.current, "x", {
        duration: 0.6,
        ease: "power3",
      })

      const yTo = gsap.quickTo($follower.current, "y", {
        duration: 0.6,
        ease: "power3",
      })

      window.addEventListener("mousemove", (e) => {
        xTo(e.clientX)
        yTo(e.clientY)
      })

      return () =>
        window.removeEventListener("mousemove", (e) => {
          xTo(e.clientX)
          yTo(e.clientY)
        })
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <>
      <div
        ref={$follower}
        className="pointer-events-none fixed left-0 top-0 aspect-square w-[50vmin] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full will-change-transform"
      >
        <div className="h-full w-full animate-spin-slow bg-gradient-to-r from-cyan-200/60 to-amber-100/60"></div>
      </div>

      {/* <div className="relative grid h-screen w-full place-items-center"> */}
      {/* <div className="absolute inset-0"></div> */}
      {/* <div className="container relative text-center">
          <h1 className="mb-10 text-5xl font-bold">
            Custom Gradient Cursor
          </h1>

          <p className="mx-auto max-w-lg">
            Notice that the cursor has the gradient background which
            is slowly spining and got blurred
          </p>

         
        </div> */}
      {/* </div> */}
    </>
  )
}

