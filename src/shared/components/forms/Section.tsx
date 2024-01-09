/* eslint-disable react/require-default-props */
import { Icon } from '@fluentui/react';
import React, { PropsWithChildren, FC } from 'react';
import { HelperButton } from './HelperButton';

import './Section.scss';

export enum SectionSize {
  h1,
  h2,
  h3,
}
export interface SectionProps {
  title: string;
  size: SectionSize;
  toolTip?: string;
  actionButton?: React.ReactNode;
  iconName?: string;
}

export const Section: FC<PropsWithChildren<SectionProps>> = (
  props: PropsWithChildren<SectionProps>
) => {
  const { title, size, actionButton, toolTip, children,iconName } = props;
  return (
    <div className="mol-section">
      <div className="header">
        {iconName && (
          <Icon iconName={iconName}/>
        )}
        {size === SectionSize.h1 && <h1>{title}</h1>}
        {size === SectionSize.h2 && <h2>{title}</h2>}
        {size === SectionSize.h3 && <h3>{title}</h3>}
        <div className="space" />
        {actionButton && <div className="action">{actionButton}</div>}
        {toolTip && <HelperButton>{toolTip}</HelperButton>}
      </div>
      <div className="lineSeparator" />
      {children}
    </div>
  );
};
