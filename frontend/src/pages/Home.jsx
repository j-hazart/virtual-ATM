import CardInteraction from "../components/home/CardInteraction";

export default function Home() {
  return (
    <section className="flex h-screen w-screen flex-col gap-16 bg-primary p-8">
      <section className="flex flex-col items-center gap-4 text-secondary">
        <h1 className="text-6xl font-bold">Bienvenue</h1>
        <p className="w-1/2 text-center text-3xl text-tertiary">
          Pour commencer à utiliser la borne, entrez le numero de votre carte
          virtuel et cliquez dessus pour l'inserer.
        </p>
      </section>
      <CardInteraction />
    </section>
  );
}
