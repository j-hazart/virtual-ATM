import ChangePinSection from "../components/dashboard/ChangePinSection.jsx";
import Numpad from "../components/dashboard/Numpad";
import { useNavigate } from "react-router-dom";
import { usePin } from "../hooks/usePin";

export default function Pin() {
  const navigate = useNavigate();
  const {
    oldPin,
    newPin,
    newPinChecked,
    addNumber,
    deleteNumber,
    setActiveInput,
  } = usePin();

  return (
    <section className="flex h-screen w-screen flex-col bg-primary p-8 text-secondary">
      <input
        className="col-span-2 w-max rounded-full bg-gradient-to-br from-[#d5d9dc] to-[#feffff] px-8 py-2 font-bold capitalize shadow-btn active:shadow-onPress"
        type="button"
        value="retour"
        onClick={() => navigate(-1)}
      />
      <div className="flex h-full w-full items-center justify-center max-md:flex-col">
        <ChangePinSection
          oldPin={oldPin}
          newPin={newPin}
          newPinChecked={newPinChecked}
          onFocus={setActiveInput}
        />
        <Numpad deleteLast={deleteNumber} addNumber={addNumber} />
      </div>
    </section>
  );
}
