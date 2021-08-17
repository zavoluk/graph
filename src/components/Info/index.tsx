import React, { FC, ReactNode } from 'react';
import BEMHelper from '@trend-dev/trendtech-ui/libs/utils/BEMHelper';

interface Props {
    /** Контент средней части */
    body: ReactNode;
    /** Контент нижней части */
    footer: ReactNode;
    /** Контент верхней части */
    header: ReactNode;
    /** Используются стили по умолчанию */
    isDefault?: boolean;
}

const classes = BEMHelper('info');

const Info: FC<Props> = ({ body, footer, header, isDefault }) => {
    return (
        <div className={classes(isDefault ? 'default' : undefined)}>
            <div className={classes('header')}>{header}</div>
            <div className={classes('body')}>{body}</div>
            <div className={classes('footer')}>{footer}</div>
        </div>
    );
};

export default Info;
