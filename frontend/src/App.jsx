import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<p>Hello World</p>} />
      </Routes>
    </main>
  );
}

export default App;
