import Header from "./components/Header";
import Home from "./components/Home";
// importa aquí más secciones cuando las tengas

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Home />
      {/* sigue agregando tus secciones aquí */}
    </main>
  );
}