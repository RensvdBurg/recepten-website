"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Recipe = {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  image?: string | null;
  time_minutes?: number;
  difficulty?: string;
};

export default function ReceptDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/recipes?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-500">Recept niet gevonden</p>
      </div>
    );
  }

  const ingredientsList = recipe.ingredients
    .split("\n")
    .filter((i) => i.trim().length > 0);

  const instructionsList = recipe.instructions
    .split("\n")
    .filter((i) => i.trim().length > 0);

  return (
    <main className="bg-zinc-50 min-h-screen">
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
        <button
          onClick={() => router.back()}
          className="text-ms text-zinc-500 hover:text-zinc-900 transition cursor-pointer"
        >
          ← Terug
        </button>
      </section>

      <section className="bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                Recept
              </span>

              <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
                {recipe.title}
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-zinc-600 max-w-xl">
                {recipe.description}
              </p>

              <div className="flex items-center gap-2">
                <span className="font-medium text-zinc-900">⏱ Tijd:</span>
                <span>{recipe.time_minutes} min</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium text-zinc-900">👨‍🍳 Niveau:</span>
                <span>{recipe.difficulty}</span>
              </div>
            </div>

            {recipe.image && (
              <div>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-[250px] h-[250px] object-cover hover:scale-105 transition duration-700 rounded-4xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-[350px_1fr] gap-10">
            <aside className="lg:sticky lg:top-8 h-fit">
              <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-zinc-900">
                  Ingrediënten
                </h2>

                <ul className="mt-6 space-y-4">
                  {ingredientsList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-zinc-700"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="bg-white rounded-3xl border border-zinc-200 p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-zinc-900">
                Bereiding
              </h2>

              <div className="mt-8 space-y-8">
                {instructionsList.map((step, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-semibold">
                      {idx + 1}
                    </div>

                    <p className="text-zinc-600 leading-8">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
