import { createContext, useEffect, useRef, useState } from "react";

export const AppStateContext = createContext({
  dialPosition: 0, // 0 degree
  setDialPosition: () => {},
});

const wsUri = "ws://localhost:8080/echo_all";

export const AppStateProvider = ({ children }) => {
  const webSocket = useRef();

  const [dialPosition, setDialPosition] = useState(0);
  const [connected, setConnected] = useState(false);

  const updateCursor = (val) => {
    if (connected) {
      webSocket.current.send(val);
    } else {
      setDialPosition(val);
    }
  };

  useEffect(() => {
    webSocket.current = new WebSocket(wsUri);
    webSocket.current.onopen = function (evt) {
      setConnected(true);
      console.log("CONNECTED");
    };
    webSocket.current.onclose = function (evt) {
      setConnected(false);
      console.log("DISCONNECTED");
    };
    webSocket.current.onmessage = async function (evt) {
      setDialPosition(parseInt(evt.data));
    };
    webSocket.current.onerror = function (evt) {
      console.log("ERROR: " + evt.data);
    };
    return () => {
      webSocket.current.close();
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
