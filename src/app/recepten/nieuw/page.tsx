"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormState = {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  time_minutes: string;
  difficulty: string;
};

export default function NieuwRecept() {
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    time_minutes: "",
    difficulty: "Makkelijk",
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("ingredients", form.ingredients);
    data.append("instructions", form.instructions);
    data.append("time_minutes", form.time_minutes);
    data.append("difficulty", form.difficulty);

    if (image) {
      data.append("image", image);
    }

    const res = await fetch("/api/recipes", {
      method: "POST",
      body: data,
    });

    setLoading(false);

    if (res.ok) {
      router.push("/recepten");
    } else {
      alert("Er ging iets mis bij opslaan");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Nieuw recept
          </h1>
          <p className="text-zinc-500 mt-2">
            Maak een nieuw recept aan en deel het met anderen
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-6"
        >
          <div>
            <label className="text-sm font-medium text-zinc-700">Titel</label>
            <input
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm"
              placeholder="Bijv. Romige pasta pesto"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">
              Beschrijving
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm"
              placeholder="Korte beschrijving van je gerecht"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">
              Tijd (minuten)
            </label>

            <input
              type="number"
              min={1}
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm"
              placeholder="30"
              value={form.time_minutes}
              onChange={(e) =>
                setForm({
                  ...form,
                  time_minutes: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">Niveau</label>

            <select
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm"
              value={form.difficulty}
              onChange={(e) =>
                setForm({
                  ...form,
                  difficulty: e.target.value,
                })
              }
            >
              <option value="Makkelijk">Makkelijk</option>
              <option value="Moeilijk">Moeilijk</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">
              Ingrediënten
            </label>
            <textarea
              rows={5}
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm resize-none"
              placeholder="Bijv. pasta, pesto, room, kip..."
              value={form.ingredients}
              onChange={(e) =>
                setForm({ ...form, ingredients: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">
              Bereiding
            </label>
            <textarea
              rows={6}
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm resize-none"
              placeholder="Beschrijf stap voor stap hoe je het maakt..."
              value={form.instructions}
              onChange={(e) =>
                setForm({ ...form, instructions: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700">
              Afbeelding
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />

            <label
              htmlFor="image-upload"
              className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-700 cursor-pointer hover:bg-zinc-50 transition"
            >
              Bestand kiezen
            </label>

            {image && (
              <p className="text-xs text-zinc-500 mt-2">
                Geselecteerd: {image.name}
              </p>
            )}

            <button
              type="button"
              onClick={() => setImage(null)}
              className="text-xs text-red-500 hover:text-red-600 transition cursor-pointer"
            >
              Verwijderen
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? "Opslaan..." : "Recept opslaan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
