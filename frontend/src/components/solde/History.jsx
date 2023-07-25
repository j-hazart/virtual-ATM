import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

export default function History({ history, account }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getUsers() {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`).then((res) => {
      setUsers(res.data.users);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  function checkOperation(operation) {
    const fromAccount = users.find(
      (user) => user.accountNumber === operation.userFrom
    );

    const toAccount = users.find(
      (user) => user.accountNumber === operation.userTo
    );

    const fromAccountName = `${
      fromAccount ? fromAccount.firstname : "compte"
    } ${fromAccount ? fromAccount.lastname : `n°${operation.userFrom}`}`;
    const toAccountName = `${toAccount ? toAccount.firstname : "compte"} ${
      toAccount ? toAccount.lastname : `n°${operation.userFrom}`
    }`;

    return operation.userFrom === account
      ? ` emit ${toAccount ? "vers" : "vers le"} ${toAccountName}`
      : `reçu ${fromAccount ? "de" : "du"} ${fromAccountName}`;
  }
  return (
    <>
      {!isLoading && (
        <div className="flex w-full max-w-md flex-col gap-4">
          <h2 className="text-2xl font-bold capitalize">historique :</h2>
          <ul>
            {history.slice(0, 10).map((operation) => {
              const formattedDate = new Date(operation.date).toLocaleDateString(
                "fr-FR"
              );
              return (
                <li key={operation.id} className="mb-4 border-b-2 capitalize">
                  <ul className="flex items-center gap-4">
                    <li className="flex-1 font-semibold">{`${operation.type} ${
                      operation.type === "virement"
                        ? checkOperation(operation)
                        : ""
                    }`}</li>
                    <li className="flex-1 text-center text-tertiary">
                      {formattedDate}
                    </li>
                    <li className="flex-1 text-right">{`${
                      operation.type === "virement"
                        ? operation.userFrom === account
                          ? "-"
                          : "+"
                        : operation.type === "depot"
                        ? "+"
                        : "-"
                    } ${operation.amount}€`}</li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

History.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      date: PropTypes.string,
      amount: PropTypes.string,
    })
  ).isRequired,
  account: PropTypes.string.isRequired,
};
