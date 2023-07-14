import PropTypes from "prop-types";
import contactlessGray from "../../assets/contactless_gray.svg";

export default function CreditCard({
  isCardInserted,
  cardNumbers,
  handleCardInserted,
}) {
  return (
    <div
      id="card"
      onClick={() => handleCardInserted()}
      className={`${
        isCardInserted ? "-translate-x-[90%] shadow-neo-plus" : "shadow-neo"
      } z-20 flex h-56 w-96 flex-col gap-2 rounded-2xl border-b-primary border-l-white border-r-primary border-t-white bg-primary p-4 transition-all duration-1000 `}
    >
      <div className="flex flex-1 items-end gap-2">
        <div className="h-8 w-10 rounded-lg border-[1px] border-[#C09B58] bg-gradient-to-br from-[#F5F3BA] to-[#C09B58]"></div>
        <img src={contactlessGray} alt="contactless logo" />
      </div>
      <p className="flex-1 text-3xl" name="card-number" id="card-number">
        {cardNumbers}
      </p>
    </div>
  );
}

CreditCard.propTypes = {
  isCardInserted: PropTypes.bool.isRequired,
  cardNumbers: PropTypes.string.isRequired,
  handleCardInserted: PropTypes.func.isRequired,
};
