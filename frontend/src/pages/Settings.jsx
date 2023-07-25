import { useNavigate } from "react-router-dom";
import settings from "../assets/gear.svg";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const [isConfirmed, setIsConfirmed] = useState(false);

  function closeAccount() {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/users/${auth().user.accountNumber}`
      )
      .then((res) => res.status === 200 && navigate("/"));
  }

  return (
    <section className="flex h-screen w-screen flex-col bg-primary p-8 text-secondary">
      <input
        className="col-span-2 w-max rounded-full bg-gradient-to-br from-[#d5d9dc] to-[#feffff] px-8 py-2 font-bold capitalize shadow-btn active:shadow-onPress"
        type="button"
        value="retour"
        onClick={() => navigate(-1)}
      />
      <div className="flex h-full w-full flex-col items-center gap-8">
        <div className="flex w-full max-w-md items-center justify-center gap-8">
          <img className="w-12" src={settings} alt="" />
          <h1 className="text-4xl font-bold">Paramètre</h1>
        </div>
        {!isConfirmed ? (
          <div className="flex flex-1 items-center">
            <button
              onClick={() => setIsConfirmed(!isConfirmed)}
              className="rounded-full px-8 py-2 shadow-btn active:shadow-onPress"
            >
              Cloturer le compte
            </button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col justify-center gap-8">
            <p>Êtes vous sûr de vouloir clôturer votre compte</p>
            <button
              onClick={() => closeAccount()}
              className="rounded-full px-8 py-2 shadow-btn active:shadow-onPress"
            >
              Oui
            </button>
            <button
              onClick={() => setIsConfirmed(!isConfirmed)}
              className="rounded-full px-8 py-2 shadow-btn active:shadow-onPress"
            >
              Non
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
