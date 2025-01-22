import { ReactNode, createContext, useState } from "react";

interface ButtonHandlers {
  text: string;
  onClick: () => void;
  autoFocus?: boolean;
}

interface DialogType {
  title: string;
  content: React.ReactNode | null | undefined;
  buttonHandlers: Array<ButtonHandlers>;
}

interface ContextType {
  isOpen: boolean;
  closeDialog: () => void;
  openDialog: (props: DialogType) => void;
  dialogProps: DialogType | null;
  setDialogProps: (value: DialogType) => void;
}

const defaultValue = {
  isOpen: false,
  closeDialog: () => {},
  openDialog: () => {},
  dialogProps: null,
  setDialogProps: () => {},
};

export const GlobalDialogContext = createContext<ContextType>(defaultValue);

interface ProviderProps {
  children: ReactNode;
}

export const GlobalDialogContextProvider = (props: ProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogType | null>(null);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const openDialog = (props: DialogType) => {
    setDialogProps(props);
    setIsOpen(true);
  };

  return (
    <GlobalDialogContext.Provider
      value={{
        isOpen,
        openDialog,
        closeDialog,
        dialogProps,
        setDialogProps,
      }}
    >
      {props.children}
    </GlobalDialogContext.Provider>
  );
};
