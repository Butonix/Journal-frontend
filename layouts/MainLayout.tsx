import React from 'react';
import clsx from 'clsx';
import {LeftMenu} from '../components/LeftMenu';
import {SideComments} from '../components/SideComments';
import {useAppSelector} from "../redux/hooks";
import {selectLeftMenu, selectRightMenu} from "../redux/slices/layout";
import Paper from '@mui/material/Paper';

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
    const rightCommentsStatus = useAppSelector(selectRightMenu)

    return (
        <div className={clsx('wrapper', className)}>
            {leftMenuStatus && <div className="leftSide">
                <LeftMenu/>
            </div>}
            <div className={clsx('content', {'content--full': contentFullWidth})}>{children}</div>
            {rightCommentsStatus && (
                <div className="rightSide">
                    <SideComments/>
                </div>
            )}
        </div>
    );
};
