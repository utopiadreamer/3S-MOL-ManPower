import React,{ createContext, FC, PropsWithChildren } from 'react';
import {  WizardStateAndLogic } from './Hook';


export interface WizardProps{
    state: WizardStateAndLogic;
}
export const WizardContext = createContext<WizardStateAndLogic>({state: { translationNamespace:'', tabs:[],selectedTabKey:'', showTabState:true, canGoBack:false,canGoNext:false},
    reset: ()=> {/* */ },   
    changeTabVisibility: ()=>{/* */}, 
    ChangeTabState: ()=>{/* */},
    selectTab: ()=>{/* */},
    nextTab:()=>{/* */},
    previousTab:()=>{/* */}}
    );
export const  Wizard: FC<PropsWithChildren<WizardProps>> = (props: PropsWithChildren<WizardProps>) => {
    const {state,children} = props;
    return (
        <WizardContext.Provider value={state}>
            {children}
        </WizardContext.Provider>
    ); 
};