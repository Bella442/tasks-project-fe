import { ReactNode, createContext, useState } from "react";

import { NEED_TO_BE_ANY } from "@sharedTypes/globalTypes";

interface ButtonHandlers {
  text: string;
  onClick: () => void;
  autoFocus?: boolean;
}

interface DialogType {
  title: string;
  content: React.ReactNode | null | undefined;
  buttonHandlers: Array<ButtonHandlers>;
  onCloseIconClick?: () => void;
}

interface ContextType {
  isOpen: boolean;
  closeDialog: () => void;
  openDialog: (props: DialogType) => void;
  dialogProps: DialogType | null;
  setDialogProps: (value: DialogType) => void;
  dialogValues: NEED_TO_BE_ANY | null;
  setDialogValues: (value: object) => void;
}

const defaultValue = {
  isOpen: false,
  closeDialog: () => {},
  openDialog: () => {},
  dialogProps: null,
  setDialogProps: () => {},
  dialogValues: null,
  setDialogValues: () => {},
};

export const GlobalDialogContext = createContext<ContextType>(defaultValue);

interface ProviderProps {
  children: ReactNode;
}

export const GlobalDialogContextProvider = (props: ProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogType | null>(null);
  const [dialogValues, setDialogValues] = useState<NEED_TO_BE_ANY | null>(null);

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
        dialogValues,
        setDialogValues,
      }}
    >
      {props.children}
    </GlobalDialogContext.Provider>
  );
};
