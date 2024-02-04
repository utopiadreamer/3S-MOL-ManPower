/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, PropsWithChildren } from 'react';
import {
  DialogType,
  Dialog,
  DialogFooter,
  IDialogProps,
  Spinner,
} from '@fluentui/react';
import './CustomDialog.scss';

interface CustomDialogProps {
  maxWidth: number;
  title: string | JSX.Element | (string & JSX.Element) | (JSX.Element & string);
  subText?: string;
  hidden: boolean;
  onDismiss: () => void;
  Footer?: React.ReactNode;
  loadingText?: string;
}

const CustomDialog: FC<PropsWithChildren<
  IDialogProps & CustomDialogProps
>> = (
  props: PropsWithChildren<IDialogProps & CustomDialogProps>
) => {
  const {
    maxWidth: maxWidthProps,
    subText: subTextProps,
    title: titleProps,
    dialogContentProps,
    modalProps,
    hidden,
    children,
    Footer,
    loadingText
  } = props;

  const modalPropsStyles = {
    main: { maxWidth: maxWidthProps },
  };
  const internalDialogContentProps = {
    type: DialogType.normal,
    title: titleProps,
    subText: subTextProps,
    ...dialogContentProps,
  };

  const internalModalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: { ...modalPropsStyles, ...props.modalProps?.styles },
      dragOptions: undefined,
    }),
    [modalPropsStyles]
  );
  return (
    <Dialog
      {...props}
      className="mol-dialog"
      hidden={hidden}
      onDismiss={() => {
        if (!loadingText){
            props.onDismiss();
        }
      }}
      dialogContentProps={internalDialogContentProps}
      modalProps={{ ...internalModalProps, ...modalProps }}
    >
       {loadingText && (
          <div className='mol-dialogLoadingContainer'>
                <Spinner size={3} title='loading'/>
                <span>{loadingText}</span>
          </div>
        )
        }
        {children}
      <DialogFooter>{Footer}</DialogFooter>
    </Dialog>
  );
};
CustomDialog.defaultProps={
  subText: undefined,
  Footer: undefined,
  loadingText: undefined
};

export { CustomDialog as Dialog };
