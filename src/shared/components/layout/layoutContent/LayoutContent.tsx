import React, { FC, PropsWithChildren } from 'react';
import {  ProgressIndicator } from '@fluentui/react';
import clsx from 'clsx';

import './LayoutContent.scss';
import { LayoutMenuItem } from '../layoutMenu/LayoutMenuItem';

export interface LayoutContentProps {
    className?: string;
    contentClassName?: string;
    menuEntry?: LayoutMenuItem[];
    loading?: boolean;
    rightPanel?: React.ReactNode;
    rightPanelClassName?: string;
}

export const LayoutContent: FC<PropsWithChildren<LayoutContentProps>> = (
    props: PropsWithChildren<LayoutContentProps>
) => {
    const { className, loading, children,contentClassName: contentClassNameProps,rightPanel, rightPanelClassName: rightPanelClassNameProps } = props;

    const layoutClassName = clsx(
        className,
        'mol-layout-content-root'
    );

    const contentClassName = clsx('layout-content', rightPanel? 'withRightPanel' : '', contentClassNameProps);
    const sidePanelClassName = clsx('layout-rightPanel',rightPanelClassNameProps);
    return (
        <div className={layoutClassName}>
            {
                loading &&
                <ProgressIndicator className='LoadingIndicator'/>
            }{
                !loading &&
                <div className='LoadingIndicator'/>
            }
            <div className={clsx('mol-layout-content',rightPanel ? 'srollable' :'')}>
                <div className={contentClassName}>{children}</div>
                {rightPanel && (
                <div className={sidePanelClassName}>{rightPanel}</div>
                )}
            </div>
        </div>
    );
};
