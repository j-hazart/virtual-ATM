import { useState } from "react";
import Welcome from "../components/home/Welcome";
import CardInteraction from "../components/home/CardInteraction";
import "../styles/Home.css";

export default function Home() {
  const [inputCardNumbers, setInputCardNumbers] = useState("");
  const [cardNumbers, setCardNumbers] = useState("#### #### #### ####");

  return (
    <section id="home">
      <Welcome
        inputCardNumbers={inputCardNumbers}
        setInputCardNumbers={setInputCardNumbers}
        setCardNumbers={setCardNumbers}
      />
      <CardInteraction
        cardNumbers={cardNumbers}
        inputCardNumbers={inputCardNumbers}
      />
    </section>
  );
}
