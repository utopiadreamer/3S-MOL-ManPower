import clsx from 'clsx';
import React,{ FC, PropsWithChildren, useContext } from 'react';
import { WizardContext } from './Wizard';
import './WizardPivotPanel.scss';

export interface WizardPivotPanelProps{
        panelKey: string;
}
export const WizardPivotPanel: FC<PropsWithChildren<WizardPivotPanelProps>> = (props: PropsWithChildren<WizardPivotPanelProps>) => {

    const {panelKey,children} = props;
    const {state} = useContext(WizardContext);

    return ( 
    <div aria-labelledby={`${state.wizardName ?? 'wizard'}_${(panelKey)}`} className={clsx('wizardPivotPanel',state.selectedTabKey === panelKey ? '' : 'hide')} role='tabpanel'>
        {children}
    </div>
    );
};