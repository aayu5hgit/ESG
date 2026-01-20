import React, { useEffect, useState } from "react";
import SignatureGenerator from "./components/Generator";
import bot from "../public/bot-laptop.png"


function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <div className="bg-white rounded-lg shadow p-6 justify-center max-w-sm">
          <img src={bot} alt="Optimite" className="mb-4 h-24 object-contain" />
          <h2 className="text-lg font-bold mb-2">
            Desktop Required!
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed">
            The Optimite Email Signature Generator works best on desktop.
            Please switch to desktop mode to generate and copy your signature.
          </p>
        </div>
      </div>
    );
  }

  return <SignatureGenerator />;
}

export default App;
