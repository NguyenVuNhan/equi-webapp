import { createContext, useEffect, useRef, useState } from "react";

export const AppStateContext = createContext({
  dialPosition: 0, // 0 degree
  setDialPosition: (_pos: number) => {},
});

const wsUri = "ws://localhost:8765";

export const AppStateProvider: React.FC = ({ children }) => {
  const webSocket = useRef<WebSocket>();

  const [dialPosition, setDialPosition] = useState(0);
  const [connected, setConnected] = useState(false);

  const updateCursor = (val: number) => {
    if (connected) {
      webSocket.current?.send(val + "");
    } else {
      setDialPosition(val);
    }
  };

  useEffect(() => {
    webSocket.current = new WebSocket(wsUri);
    webSocket.current.onopen = function (_evt) {
      setConnected(true);
      console.log("CONNECTED");
    };
    webSocket.current.onclose = function (_evt) {
      setConnected(false);
      console.log("DISCONNECTED");
    };
    webSocket.current.onmessage = async function (evt) {
      console.log(evt.data);
      setDialPosition(parseInt(evt.data));
    };
    webSocket.current.onerror = function (evt) {
      console.error("ERROR: " + evt);
    };
    return () => {
      webSocket.current?.close();
    };
  }, []);

  return (
    <AppStateContext.Provider
      value={{ dialPosition, setDialPosition: updateCursor }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
