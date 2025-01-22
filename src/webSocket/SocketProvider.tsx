import { ReactElement, createContext } from "react";

const socket = new WebSocket("wss://ws.postman-echo.com/raw");

export const SocketContext = createContext(socket);

interface ISocketProvider {
  children: ReactElement;
}

export const SocketProvider = (props: ISocketProvider) => {
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
