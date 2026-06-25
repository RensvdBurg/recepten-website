import Image from "next/image";
import recipea from "../../images/recipea.png";

export default function AboutPage() {
  return (
    <main className="bg-zinc-50 min-h-screen">
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900">
            Over Recipea
          </h1>

          <p className="mt-5 text-zinc-600 text-lg leading-relaxed">
            Recipea is ontstaan uit een simpele passie: lekker eten delen met
            iedereen. Wij geloven dat koken leuk, toegankelijk en inspirerend
            moet zijn — voor iedereen, van beginner tot chef.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 xl:px-32 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Onze missie
            </h2>

            <p className="mt-4 text-zinc-600 leading-relaxed">
              Wij willen een platform bouwen waar iedereen recepten kan
              ontdekken, bewaren en delen. Van snelle doordeweekse maaltijden
              tot creatieve gerechten voor speciale momenten.
            </p>

            <p className="mt-4 text-zinc-600 leading-relaxed">
              Koken moet geen verplichting zijn, maar een ervaring.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-zinc-700 text-sm">
              <Image src={recipea} alt="team afbeelding" />
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 bg-white">
        <h2 className="text-2xl font-semibold text-zinc-900">
          Waar wij voor staan
        </h2>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Eenvoud",
              desc: "Recepten moeten duidelijk, begrijpelijk en haalbaar zijn voor iedereen.",
              icon: "🍽️",
            },
            {
              title: "Community",
              desc: "Samen maken we koken leuker door recepten te delen en te ontdekken.",
              icon: "🤝",
            },
            {
              title: "Inspiratie",
              desc: "Elke dag nieuwe ideeën om je keuken in te duiken.",
              icon: "✨",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 hover:shadow-md transition"
            >
              <div className="text-2xl">{item.icon}</div>
              <h3 className="mt-3 font-semibold text-zinc-900">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-20 bg-zinc-900 text-white text-center">
        <h2 className="text-3xl font-semibold">
          Heb jij vragen?
        </h2>

        <p className="mt-4 text-zinc-300 max-w-xl mx-auto">
          Klik dan op de knop om naar de contact pagina te gaan waar jij jou vragen kan stellen.
        </p>

        <a
          href="/contact"
          className="inline-block mt-8 bg-white text-zinc-900 px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition"
        >
          Contact pagina
        </a>
      </section>
    </main>
  );
}
