import React, { FC } from 'react';
import { Icon } from '@fluentui/react';

export interface LayoutMenuHeaderProps {
  opened?: boolean;
  onToggled?: () => void;
}

export const LayoutMenuHeader: FC<LayoutMenuHeaderProps> = (
  props: LayoutMenuHeaderProps
) => {
  const { opened, onToggled } = props;

  return (
    <span
      aria-hidden
      className="layout-menu-nav-button"
      title={opened ? 'Close' : 'Open'}
      onClick={() => onToggled?.()}
    >
      <Icon className="layout-menu-nav-item-icon" iconName="GlobalNavButton" />
    </span>
  );
};
