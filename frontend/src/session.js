import React, { useState, createContext, useContext, useEffect } from "react";
import { SessionKit } from "@wharfkit/session";
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor";
import { WebRenderer } from "@wharfkit/web-renderer";

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [sessionKit, setSessionKit] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const initSessionKit = () => {
      try {
        const kit = new SessionKit({
          appName: "Student Records",
          chains: [{
            id: "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
            url: "https://jungle4.cryptolions.io"
          }],
          ui: new WebRenderer(),
          walletPlugins: [new WalletPluginAnchor()]
        });
        setSessionKit(kit);
      } catch (error) {
        console.error("Error initializing SessionKit:", error);
      }
    };

    initSessionKit();
  }, []);

  const value = {
    sessionKit,
    session,
    setSession
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
