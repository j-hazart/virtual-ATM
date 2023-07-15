import cash from "../assets/money.svg";

export default function Withdraw() {
  const pad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <section className="flex h-screen w-screen bg-primary p-8">
      <div className="">
        <img src={cash} alt="money logo" />
        <h1>Retrait</h1>
        <p>Entrez le montant que vous souhaitez retirer</p>
        <input type="text" name="withdraw" id="withdraw" />
        <input type="button" value="Valider" />
        <input type="button" value="Retour" />
      </div>
      <div className="grid h-max w-max grid-cols-3 grid-rows-4 gap-4">
        {pad.map((number) => (
          <input key={number} type="button" value={number} />
        ))}
        <input
          className="col-span-2 bg-slate-700"
          type="button"
          value="effacer"
        />
      </div>
    </section>
  );
}
