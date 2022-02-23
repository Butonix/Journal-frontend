import React from 'react';
import clsx from 'clsx';
import {LeftMenu} from '../components/LeftMenu';
import {useAppSelector} from "../redux/hooks";
import {selectLeftMenu} from "../redux/slices/layout";

interface MainLayoutProps {
    hideComments?: boolean;
    contentFullWidth?: boolean;
    className?: string;
    hideMenu?: boolean
}

export const MainLayout: React.FC<MainLayoutProps> = ({
                                                          children,
                                                          contentFullWidth,
                                                          className,
                                                      }) => {
    const leftMenuStatus = useAppSelector(selectLeftMenu)

    return (
        <div className={clsx('wrapper', className)}>
            {leftMenuStatus && <div className="leftSide">
                <LeftMenu/>
            </div>}
            <div className={clsx('content', {'content--full': contentFullWidth})}>{children}</div>
        </div>
    );
};
