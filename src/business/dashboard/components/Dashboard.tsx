import { FC } from "react";
import { CollapsibleSection } from "../../../shared/components/forms/CollapsibleSection";

export const Dashboard: FC = () => {
  return (
    <div>
      <CollapsibleSection open title="حقول البحث"><div>
        data</div></CollapsibleSection>
    </div>
  );
};
