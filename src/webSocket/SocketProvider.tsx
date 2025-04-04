import { ReactElement, createContext } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

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
