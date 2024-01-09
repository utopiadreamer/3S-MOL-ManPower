import React, { FC, useState, PropsWithChildren } from 'react';
import { Icon, Callout, getId } from '@fluentui/react';
import './Forms.scss';
import './HelperButton.scss';

export const HelperButton: FC<PropsWithChildren<{}>> = (
  props: PropsWithChildren<{}>
) => {
  const { children } = props;
  const [helpTextOpen, setHelpTextOpen] = useState<boolean>();
  const helpIconId = getId('helpIcon');
  return (
    <>
      <div className="mol-info">
        <Icon
          id={helpIconId}
          iconName="info"
          onClick={() => setHelpTextOpen(true)}
        />
      </div>
      {helpTextOpen && (
        <Callout
          target={`#${helpIconId}`}
          onDismiss={() => setHelpTextOpen(false)}
          gapSpace={0}
          setInitialFocus
        >
          <div className="mol-helperText">{children}</div>
        </Callout>
      )}
    </>
  );
};
