import React, { PropsWithChildren, FC, useState, useEffect } from 'react';
import { IIconProps, ActionButton } from '@fluentui/react';
import { Section, SectionSize } from './Section';

import './Panel.scss';

export interface PanelProps {
  title: string;
  editable?: boolean;
  allowEdition: boolean;
  editTitle?: string;
  editText?: string;
  onChangeEdit?: (editable: boolean) => void;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}
const pencilIcon: IIconProps = { iconName: 'Edit' };

export const Panel: FC<PropsWithChildren<PanelProps>> = (
  props: PropsWithChildren<PanelProps>
) => {
  const {
    editable: editableProps,
    title,
    allowEdition,
    editTitle,
    editText,
    onChangeEdit,
    children,
    footer,
    header
  } = props;
  const [editable, setEditable] = useState<boolean>(editableProps ?? false);

  useEffect(() => {
    setEditable(editableProps ?? false);
  }, [editableProps]);

  const onChange = () => {
    if (onChangeEdit) {
      onChangeEdit(!editable);
    }
    setEditable(!editable);
  };

  return (
    <div className="eta-panel">
      <div className="header">
        {header ? <>{header}</> : (
          <div className="title">
            <Section title={title} size={SectionSize.h2} />
          </div>
        )}
        <div className="space" />
        {allowEdition && (
          <div className="editable">
            {' '}
            <ActionButton
              iconProps={pencilIcon}
              title={editTitle}
              text={editText || ''}
              onClick={onChange}
              disabled={editable}
            />
          </div>
        )}
      </div>
      {children}
      <div className="footer">{editable && footer}</div>
    </div>
  );
};
