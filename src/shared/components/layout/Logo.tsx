import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Logo: FC = () => {
    return (
        <NavLink to="/" className="layout-header-logo">
            <img src="/logo.png"  alt="Application logo" />
        </NavLink>
    );
};
