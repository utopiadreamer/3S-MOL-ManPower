import React, { FC } from 'react';
import { IIconProps, Icon } from '@fluentui/react';
import clsx from 'clsx';

export type LayoutMenuIconProps = IIconProps & {
  showBadge?: boolean;
};

export const LayoutMenuIcon: FC<LayoutMenuIconProps> = (
  props: LayoutMenuIconProps
) => {
  const { className, showBadge } = props;
  const iconProps = {
    ...props,
    className: '',
  };

  const useClassName = clsx('layout-menu-icon', className);

  return (
    <div className={useClassName}>
      <Icon {...iconProps} />
      {showBadge && (
        <div className="layout-menu-badge-container">
          <Icon iconName="LocationDot" className="badge" />
        </div>
      )}
    </div>
  );
};
