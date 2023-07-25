import logout from "../assets/sign-out.svg";
import cash from "../assets/money.svg";
import wallet from "../assets/wallet.svg";
import bank from "../assets/bank.svg";
import bank2 from "../assets/bank2.svg";
import leftArrow from "../assets/arrow-fat-left.svg";
import rightArrow from "../assets/arrow-fat-right.svg";
import creditCard from "../assets/credit-card.svg";
import gear from "../assets/gear.svg";
import Card from "../components/dashboard/Card";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";

export default function Dashboard() {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const { firstname, lastname } = auth().user;
  const signOut = useSignOut();

  function handleSignOut() {
    signOut();
    navigate("/");
  }
  return (
    <section className="flex h-screen w-screen flex-col bg-primary text-secondary">
      <header className="mt-8 flex justify-between p-4">
        <h1 className="text-5xl font-bold capitalize">
          Bienvenu {firstname} {lastname}
        </h1>
        <div
          className="flex items-center gap-2 rounded-full border-[1px] border-tertiary px-4 active:border-none active:shadow-neo_inset"
          onClick={() => handleSignOut()}
        >
          <img src={logout} alt="exit logo" />
          <p className="max-sm:hidden">deconnexion</p>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-4 p-8">
          <Card
            firstLogo={cash}
            content="retirer de l'argent"
            page="withdraw"
          />
          <Card firstLogo={wallet} content="consulter le solde" page="solde" />
          <Card
            firstLogo={bank2}
            secondLogo={rightArrow}
            page="transfer"
            content="Effectuer un virement"
          />
          <Card
            firstLogo={leftArrow}
            secondLogo={bank}
            page="deposit"
            content="déposer de l'argent"
          />
          <Card firstLogo={creditCard} content="changer code PIN" page="pin" />
          <Card
            firstLogo={gear}
            content="paramètres du compte"
            page="settings"
          />
        </div>
      </div>
    </section>
  );
}
