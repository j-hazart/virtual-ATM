import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Card({ firstLogo, secondLogo, content, page }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl p-[2px] shadow-in">
      <div
        className={` flex justify-between rounded-2xl border-[1px] border-tertiary px-8 shadow-button active:shadow-in max-md:h-20 max-md:w-full max-md:items-center md:h-40 md:w-72 md:flex-col md:p-8`}
        onClick={() => navigate(`/dashboard/${page}`)}
      >
        <div className="flex">
          <img src={firstLogo} alt="logo" />
          {secondLogo && <img src={secondLogo} alt="logo" />}
        </div>
        <p className="font-bold capitalize text-tertiary">{content}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  firstLogo: PropTypes.string.isRequired,
  secondLogo: PropTypes.string,
  content: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
