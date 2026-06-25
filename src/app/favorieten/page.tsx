"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFavorites } from "@/lib/favorites";

type Recipe = {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  difficulty: string;
};

export default function FavorietenPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));

    setFavorites(getFavorites());
  }, []);

  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-semibold text-zinc-900">
            ⭐ Jouw favorieten
          </h1>
          <p className="text-zinc-500 mt-2">
            Al je opgeslagen recepten op één plek
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {favoriteRecipes.length === 0 ? (
          <p className="text-zinc-500">Nog geen favorieten opgeslagen</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRecipes.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-zinc-900">
                  {r.title}
                </h2>

                <p className="text-sm text-zinc-500 mt-2">{r.description}</p>
                <p className="text-sm text-zinc-500 mt-2 line-clamp-3">
                  <span className="font-medium text-zinc-900">👨‍🍳 Niveau: </span>
                  {r.difficulty}
                </p>

                <Link
                  href={`/recepten/${r.id}`}
                  className="text-sm text-zinc-700 font-medium mt-4 inline-block hover:text-black"
                >
                  Bekijken →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
