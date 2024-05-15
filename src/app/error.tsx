"use client";

import H1 from "@/components/ui/h1";
import Img from "../assets/inactiveBalloonMonsterFront.4eca22acdc791643a1c1.webp";
import Image from "next/image";

export default function Error() {
  return (
    <main className="m-auto my-7 flex max-w-5xl flex-col items-center space-y-5 p-3 text-center">
      <div>
        <H1>Error</H1>
        <p className="text-muted-foreground">An unexpected error occurred</p>
      </div>
      <Image
        alt="error"
        src={Img}
        className="rounded  bg-[#fffdfdbc] p-3"
      ></Image>
    </main>
  );
}
