"use client";

import Image from "next/image";
import logo from "../images/logo.png";
import { useEffect, useState } from "react";
export default function HomePage() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.length);
      });
  }, []);
  return (
    <main className="bg-zinc-50 min-h-screen">
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 leading-tight">
              Ontdek, deel en kook de lekkerste recepten
            </h1>

            <p className="mt-5 text-zinc-600 text-base md:text-lg">
              Van snelle doordeweekse maaltijden tot uitgebreide diners. Vind
              inspiratie of maak je eigen recepten aan.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="/recepten"
                className="bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-800 transition"
              >
                Bekijk recepten
              </a>

              <a
                href="/recepten/nieuw"
                className="bg-white border border-zinc-300 px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-100 transition"
              >
                Recept toevoegen
              </a>
            </div>

            <p className="mt-6 text-sm text-zinc-500">
              Er zijn momenteel{" "}
              <span className="font-medium text-zinc-900">{count}</span>{" "}
              recepten beschikbaar
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center">
              <span className="text-zinc-700 text-sm">
                <Image src={logo} alt="logo website" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-20 bg-zinc-900 text-white text-center">
        <h2 className="text-3xl font-semibold">
          Deel jouw eigen recepten met de wereld
        </h2>

        <p className="mt-4 text-zinc-300 max-w-xl mx-auto">
          begin nu met het uploaden van je favoriete gerechten.
        </p>

        <a
          href="/recepten/nieuw"
          className="inline-block mt-8 bg-white text-zinc-900 px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition"
        >
          Start nu
        </a>
      </section>
    </main>
  );
}
