import LetterGlitch from "@/components/molecules/LetterGlitch";

const Header: React.FC = () => (
  <header className="flex flex-col items-center text-center w-full">
    <div className="h-[60vh] relative block w-full">
      <div className="absolute inset-0 w-full h-full z-0">
        <LetterGlitch
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={100}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 mix-blend-color-dodge">
        <h1 className="text-7xl md:text-8xl font-extrabold mb-4">CREATE MC BEDROCK CLI</h1>
      </div>
    </div>
    <p className="text-xs text-gray-500 pt-2">
      Tip: Squint your eyes.
    </p>
  </header>
);

export default Header;
