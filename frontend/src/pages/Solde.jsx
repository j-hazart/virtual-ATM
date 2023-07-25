import { useNavigate } from "react-router-dom";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import axios from "axios";
import History from "../components/solde/History";
import { useEffect, useState } from "react";

export default function Solde() {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function getUserData() {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${
          auth().user.accountNumber
        }/operations`,
        {
          headers: {
            Authorization: `Bearer ${authHeader().slice(7)}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data.user);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {!isLoading && (
        <section className="flex h-screen w-screen flex-col bg-primary p-8 text-secondary">
          <input
            className="col-span-2 w-max rounded-full bg-gradient-to-br from-[#d5d9dc] to-[#feffff] px-8 py-2 font-bold capitalize shadow-btn active:shadow-onPress"
            type="button"
            value="retour"
            onClick={() => navigate(-1)}
          />
          <div className="flex h-full w-full flex-col items-center justify-center gap-8">
            <div className="flex w-full max-w-md flex-col items-center gap-8">
              <h1 className="rounded-xl p-4 text-2xl font-bold shadow-neo_inset">
                Compte n°{user.accountNumber}
              </h1>
              <p className="rounded-full p-4 text-xl font-medium uppercase shadow-btn">
                solde : {user.solde}€
              </p>
            </div>
            <History history={user.operations} account={user.accountNumber} />
          </div>
        </section>
      )}
    </>
  );
}
