import PropTypes from "prop-types";
import InputAmount from "./InputAmount";
import InputAccount from "./InputAccount";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

export default function InputSection({
  logo,
  title,
  type,
  paragraph,
  inputValue,
  setActiveInput,
  accountNumbers,
  transfer,
}) {
  const auth = useAuthUser();
  function Deposit() {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${
          auth().user.accountNumber
        }/solde`,
        {
          type,
          userFrom: auth().user.accountNumber,
          userTo: accountNumbers ? accountNumbers : auth().user.accountNumber,
          amount: inputValue,
        }
      )
      .then((res) => console.log(res));
  }
  return (
    <div className="flex h-max w-max flex-1 flex-col gap-16 rounded-xl p-8">
      <div className="flex items-center justify-center gap-4">
        <img className="w-16" src={logo} alt="money logo" />
        <h1 className="text-3xl font-bold uppercase">{title}</h1>
      </div>

      <div className="flex flex-col gap-8">
        {transfer && (
          <InputAccount
            setActiveInput={setActiveInput}
            accountNumbers={accountNumbers}
          />
        )}
        <InputAmount
          value={inputValue}
          content={paragraph}
          setActiveInput={setActiveInput}
        />
        <input
          className="w-max self-center rounded-xl bg-gradient-to-br from-[#d5d9dc] to-[#feffff] px-8 py-2 font-bold uppercase shadow-btn active:shadow-onPress"
          type="button"
          onClick={() => Deposit()}
          value="Valider"
        />
      </div>
    </div>
  );
}
InputSection.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  setActiveInput: PropTypes.func.isRequired,
  accountNumbers: PropTypes.string,
  transfer: PropTypes.bool,
};
