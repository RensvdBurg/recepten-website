"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFavorites, toggleFavorite } from "@/lib/favorites";

type Recipe = {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  image?: string | null;
  difficulty: string;
};

export default function ReceptenPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const filteredRecipes = recipes.filter((recipe) => {
    const query = search.toLowerCase();

    return (
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.toLowerCase().includes(query)
    );
  });
  
  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      });

    setFavorites(getFavorites());
  }, []);

  const handleToggle = (id: number) => {
    const updated = toggleFavorite(id);
    setFavorites([...updated]);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900">
              Ontdek recepten
            </h1>
            <p className="text-zinc-500 mt-2">
              Bekijk en ontdek heerlijke gerechten
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Zoek een recept..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-2 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-zinc-200 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((r) => {
              const isFav = favorites.includes(r.id);

              return (
                <div
                  key={r.id}
                  className="group relative bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                >
                  <button
                    onClick={() => handleToggle(r.id)}
                    className="absolute top-4 right-4 text-lg"
                  >
                    {isFav ? "⭐" : "☆"}
                  </button>

                  <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-700 transition">
                    {r.title}
                  </h2>

                  <p className="text-sm text-zinc-500 mt-2 line-clamp-3">
                    {r.description}
                  </p>
                  <p className="text-sm text-zinc-500 mt-2 line-clamp-3">
                    <span className="font-medium text-zinc-900">
                      👨‍🍳 Niveau:{" "}
                    </span>
                    {r.difficulty}
                  </p>

                  <div className="mt-5">
                    <Link
                      href={`/recepten/${r.id}`}
                      className="text-sm text-zinc-700 font-medium hover:text-black transition"
                    >
                      Bekijken →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
