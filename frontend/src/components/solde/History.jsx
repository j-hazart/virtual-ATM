import PropTypes from "prop-types";
import users from "../../services/fakeUserData";

export default function History({ history, account }) {
  function checkOperation(operation) {
    const fromAccount = users.filter(
      (user) => user.accountNumber === operation.from
    )[0];
    const toAccount = users.filter(
      (user) => user.accountNumber === operation.to
    )[0];

    const fromAccountName = `${fromAccount.firstname} ${fromAccount.lastname}`;
    const toAccountName = `${toAccount.firstname} ${toAccount.lastname}`;

    return operation.from === account
      ? `vers ${toAccountName}`
      : `de ${fromAccountName}`;
  }
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <h2 className="text-2xl font-bold capitalize">historique :</h2>
      <ul>
        {history.slice(0, 10).map((operation) => {
          return (
            <li key={operation.id} className="mb-4 border-b-2 capitalize">
              <ul className="flex items-center gap-4">
                <li className="flex-1 font-semibold">{`${operation.type} ${
                  operation.from ? checkOperation(operation) : ""
                }`}</li>
                <li className="flex-1 text-center text-tertiary">
                  {operation.date}
                </li>
                <li className="flex-1 text-right">{`${
                  operation.from
                    ? operation.from === account
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
  );
}

History.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      from: PropTypes.number,
      to: PropTypes.number,
      date: PropTypes.string,
      amount: PropTypes.number,
    })
  ).isRequired,
  account: PropTypes.number.isRequired,
};

History.defaultProp = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      from: null,
      to: null,
      date: PropTypes.string,
      amount: PropTypes.number,
    })
  ),
};
