const Header = () => {
  return (
    <header className="w-full px-10 py-4 bg-[#2f3362] flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-[#c4a64b] font-bold tracking-widest text-2xl font-serif whitespace-nowrap">
        HAPPY HUMAN
      </h1>

      {/* Menú */}
      <nav className="flex gap-10 text-white text-lg font-serif">
        <a href="#" className="hover:underline">HOME</a>
        <a href="#" className="hover:underline">ACERCA DE</a>
        <a href="#" className="hover:underline">DANIEL CORRAL</a>
        <a href="#" className="hover:underline">TRABAJO</a>
      </nav>

      {/* CTA */}
      <button className="bg-[#ffc438] text-[#4b2207] font-extrabold px-6 py-3 text-lg rounded-md">
        CAMBIA TU VIDA
      </button>
    </header>
  );
};

export default Header;