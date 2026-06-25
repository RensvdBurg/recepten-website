"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Bericht verzonden!");

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert("Er ging iets mis.");
      }
    } catch (error) {
      console.error(error);
      alert("Er ging iets mis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-zinc-50 min-h-screen">
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold text-zinc-900">
            Neem contact met ons op
          </h1>

          <p className="mt-4 text-zinc-600">
            Heb je een vraag, idee of feedback? We horen graag van je.
            Stuur ons een bericht en we reageren zo snel mogelijk.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 xl:px-32 pb-20">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-900">
              Stuur een bericht
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-4"
            >
              <div>
                <label className="text-sm text-zinc-600">
                  Naam
                </label>

                <input
                  type="text"
                  placeholder="Jouw naam"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                  className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-600">
                  E-mail
                </label>

                <input
                  type="email"
                  placeholder="Jouw email adres"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  required
                  className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-600">
                  Bericht
                </label>

                <textarea
                  rows={5}
                  placeholder="Schrijf je bericht..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  required
                  className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-zinc-900 text-white rounded-full py-3 text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-50"
              >
                {loading
                  ? "Bericht verzenden..."
                  : "Verstuur bericht"}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-zinc-200 rounded-2xl p-6">
              <h3 className="font-semibold text-zinc-900">
                Contactgegevens
              </h3>

              <p className="mt-3 text-sm text-zinc-600">
                📧 rensvdburg050@hotmail.com
                <br />
                📍 Groningen, Nederland
                <br />
                ⏱ Binnen 24 uur ontvangt u een reactie
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-6">
              <h3 className="font-semibold text-zinc-900">
                Waar kunnen we je mee helpen?
              </h3>

              <ul className="mt-3 text-sm text-zinc-600 space-y-2">
                <li>🍳 Recepten uploaden</li>
                <li>🐛 Bugs of problemen</li>
                <li>💡 Feature ideeën</li>
                <li>🤝 Samenwerkingen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Gebruiker vult formulier in
//           ↓
// form state wordt bijgewerkt
//           ↓
// Klik op "Verstuur bericht"
//           ↓
// handleSubmit()
//           ↓
// preventDefault()
//           ↓
// loading = true
//           ↓
// POST naar /api/contact
//           ↓
// Server verwerkt bericht
//           ↓
// success = true ?
//       ↙          ↘
//    JA             NEE
//     ↓              ↓
// Alert          Foutmelding
//     ↓
// Formulier leegmaken
//     ↓
// loading = false