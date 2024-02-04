import {
  ProgressIndicator,
  DefaultButton,
  Icon,
  IconButton,
  Label,
  IContextualMenuItem,
  IContextualMenuProps,
} from '@fluentui/react';
import React, { FC, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import './FileSelector.scss';
import { FilesUtil } from '../../utils/filesUtil';
import { useTranslation } from "react-i18next";

export interface FileSelectorLabels {
  selectFile: string;
  viewFile?: string;
  downloadFile?: string;
  chooseAnotherFile?: string;
  unSelectFile?: string;
  deleteFile?: string;
  cancelUpload?: string;
}
export interface FileInfo {
  name: string;
  size?: number;
  file?: File;
  url?: string;
}
export enum FileSelectorMode{
  standard,
  Button,
  Menu
}
export interface FileSelectorProps {
  title?: string;
  classname?: string;
  readonly?: boolean;
  errorMessage?: string;
  uploadProgressState?: number;
  extensionFilter?: string;
  labels: FileSelectorLabels;
  selectedFile?: FileInfo;
  onUnSelectFile?: () => void;
  onSelectFile?: (file: FileInfo) => void;
  onDownloadFile?: (file: FileInfo) => void;
  onDeleteFile?: (file: FileInfo) => void;
  onCancelUpload?: () => void;
  mode?: FileSelectorMode;
}
export const FileSelector: FC<FileSelectorProps> = (
  props: FileSelectorProps
) => {
  const { t } = useTranslation(["common"]);
  const fileInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    extensionFilter,
    labels,
    selectedFile,
    onSelectFile,
    onDownloadFile,
    uploadProgressState,
    onCancelUpload,
    onUnSelectFile,
    onDeleteFile,
    readonly,
    classname,
    errorMessage,
    mode,
    title
  } = props;
  const [fileInfo, setFileInfo] = useState<FileInfo | undefined>(selectedFile);
  const [showContextualMenu, setShowContextualMenu] = React.useState(false);

  useEffect(() => {
    if (selectedFile) {
      setFileInfo(selectedFile);
    }
  }, [selectedFile]);

  const onChangedFile = (ev: React.FormEvent<HTMLInputElement>) => {
    if (ev.currentTarget.files?.length === 1) {
      const fileObject = ev.currentTarget.files[0];
      const file = {
        file: fileObject,
        name: fileObject.name,
        size: fileObject.size,
      };
      setFileInfo(file);
      if (onSelectFile) {
        onSelectFile(file);
      }
    }
  };
  const viewFileContent = (fileObject: File) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(fileObject);
      fileReader.onload = () => {
        const fileContent = fileReader.result;

        if (fileContent) {
          const fileType = fileObject.type;
          const blob = new Blob([fileContent], { type: fileType });
          const url = URL.createObjectURL(blob);
          window.open(url);
          URL.revokeObjectURL(url);
        }
      };
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.error(ex);
    }
  };
  const onViewFile = () => {
    if (fileInfo?.file) {
      viewFileContent(fileInfo.file);
    }
  };
  const getFileSizeString = (filesize?: number) => {
    if (filesize) {
      return `(${FilesUtil.FileSizeToString(filesize)})`;
    }
    return '';
  };
  const getUploadProgressStateString = () => {
    if (uploadProgressState) {
      if (uploadProgressState >= 1) {
        return `(100 %) `;
      }
      return `(${Math.round(uploadProgressState * 100)} %) `;
    }
    return '';
  };

  const buildMenuItems = (): IContextualMenuItem[] => {
    const menuItems: IContextualMenuItem[] = [];

    if (fileInfo && labels.chooseAnotherFile) {
      menuItems.push({
        key: 'chooseAnotherFile',
        text: labels.chooseAnotherFile,
        iconProps: { iconName: 'OpenFile' },
        onClick: () => {
          if (fileInput.current) {
            fileInput.current.click();
          }
        },
      });
      if (fileInfo?.file && labels.viewFile && !errorMessage) {
        menuItems.push({
          key: 'viewFile',
          text: labels.viewFile,
          iconProps: { iconName: 'View' },
          onClick: () => onViewFile(),
        });
      }
      if (fileInfo?.url && labels.downloadFile && !errorMessage) {
        menuItems.push({
          key: 'downloadFile',
          text: `${labels.downloadFile} ${getFileSizeString(fileInfo.size)}`,
          iconProps: { iconName: 'Download' },
          onClick: () => {
            if (onDownloadFile) {
              onDownloadFile(fileInfo);
            }
          },
        });
      }
      if (fileInfo?.url && labels.deleteFile) {
        menuItems.push({
          key: 'deleteFile',
          text: labels.deleteFile,
          iconProps: { iconName: 'Delete' },
          onClick: () => {
            if (onDeleteFile) {
              onDeleteFile(fileInfo);
            }
          },
        });
      }
      if (fileInfo && labels.unSelectFile) {
        menuItems.push({
          key: 'unselectFile',
          text: labels.unSelectFile,

          iconProps: { iconName: 'Cancel' },
          onClick: () => {
            setFileInfo(undefined);
            if (formRef.current) {
              formRef.current.reset();
              if (onUnSelectFile){
                onUnSelectFile();
              }
            }
          },
        });
      }
    }
    return menuItems;
  };

  const menuProps: IContextualMenuProps = {
    shouldFocusOnMount: true,
    items: buildMenuItems(),
  };
  const currentMode = mode ?? FileSelectorMode.standard;
  return (
    <div className={clsx('mol-fileSelector', classname)}>
      <form ref={formRef}>
        <div className='label-description'>
          <Label required>{title}</Label>
          <span className='desc'>{t("common:descFileSelector")}</span>
        </div>
        <div>
          <input
            type="file"
            name="file"
            multiple={false}
            accept={extensionFilter}
            ref={fileInput}
            onChange={onChangedFile}
          />
        </div>
        <div className='fileSelector_btn'>
          {((!fileInfo || currentMode === FileSelectorMode.Button) && !readonly) && (
            <DefaultButton
              iconProps={{ iconName: 'OpenFile' }}
              className={clsx(
                'fileSelection',
                currentMode === FileSelectorMode.Button ? 'noBorder' : ''
              )}
              text={labels.selectFile}
              onClick={() => {
                if (fileInput.current) {
                  fileInput.current.click();
                }
              }}
            />
          )}
          {((!fileInfo || currentMode === FileSelectorMode.Button) && readonly) && (
            <div
              className={clsx(
                'fileSelection readonly',
                currentMode === FileSelectorMode.Button ? 'noBorder' : '',
                errorMessage ? 'error' : ''
              )}
            >
              <div className="filePlaceHolder" />
            </div>
          )}
          {(fileInfo && currentMode === FileSelectorMode.standard) && (
            <div
              className={clsx(
                'fileSelection',
                errorMessage ? 'error' : '',
                readonly ? 'readonly' : ''
              )}
            >
              <div className="filePlaceHolder">
                <Icon iconName="TextDocument" className="icon" />
                <Label
                  className={clsx('text', fileInfo.url ? 'clickable' : '')}
                  title={`${getUploadProgressStateString()}${
                    fileInfo.name
                  } ${getFileSizeString(fileInfo.size)}`}
                  onClick={() => {
                    if (onDownloadFile && fileInfo.url) {
                      onDownloadFile(fileInfo);
                    }
                  }}
                >
                  {`${getUploadProgressStateString()}${
                    fileInfo.name
                  } ${getFileSizeString(fileInfo.size)}`}{' '}
                </Label>
                {uploadProgressState === undefined && !readonly && (
                  <IconButton
                    className="iconMenu"
                    menuIconProps={{ iconName: 'MoreVertical' }}
                    menuProps={menuProps}
                    onClick={() => setShowContextualMenu(!showContextualMenu)}
                  />
                )}
                {uploadProgressState !== undefined &&
                  labels.cancelUpload &&
                  onCancelUpload && (
                    <IconButton
                      className="iconMenu"
                      title={labels.cancelUpload}
                      iconProps={{ iconName: 'Cancel' }}
                      onClick={() => {
                        if (onCancelUpload) {
                          onCancelUpload();
                        }
                      }}
                    />
                  )}
              </div>
              {uploadProgressState !== undefined && (
                <ProgressIndicator percentComplete={uploadProgressState} />
              )}
            </div>
          )}
           {(fileInfo && !readonly && currentMode === FileSelectorMode.Menu) && (
              <IconButton
                className="iconMenu"
                menuIconProps={{ iconName: 'MoreVertical' }}
                menuProps={menuProps}
                onClick={() => setShowContextualMenu(!showContextualMenu)}
              />
           )}
          {errorMessage && <Label className="error">{errorMessage}</Label>}
        </div>
      </form>
    </div>
  );
};
