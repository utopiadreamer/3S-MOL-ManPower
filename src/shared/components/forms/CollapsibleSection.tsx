import { FC, PropsWithChildren, useState } from "react";
import Collapsible from "react-collapsible";
import "./CollapsibleSection.scss";
import { Icon } from "office-ui-fabric-react";
import clsx from "clsx";

export interface Props {
  open?: boolean;
  title?: string;
  titleClassName?: string;
  iconName?: string;
}

export const CollapsibleSection: FC<PropsWithChildren<Props>> = (
  props: PropsWithChildren<Props>
) => {
  const { children, open, title, titleClassName, iconName } = props;
  const [opened, setOpened] = useState<boolean>(open ?? false);
  const getHeader = () => {
    return (
      <div className="collapseHeader">
        <div className={clsx("headerTitle", titleClassName)}>
          {iconName && <Icon iconName={iconName} />}
          <span>{title}</span>
        </div>
        <Icon className="arrow" iconName={opened ? "ChevronUpSmall" : "ChevronDownSmall"} />
      </div>
    );
  };
  return (
    <div className="section">
      <div className="content">
        <Collapsible
          open={open}
          onOpening={() => setOpened(true)}
          onClosing={() => setOpened(false)}
          trigger={getHeader()}
        >
          <div className="sectionContent">            
          {children}
          </div>
        </Collapsible>
      </div>
    </div>
  );
};
