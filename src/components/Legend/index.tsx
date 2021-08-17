import React, { FC } from 'react';
import BEMHelper from '@trend-dev/trendtech-ui/libs/utils/BEMHelper';

import { useGraphContext } from 'components/Context';

import getFirstTruthyPoint from 'libs/getFirstTruthyPoint';

const classNames = BEMHelper('graph');

const Legend: FC = () => {
    const {
        data,
        graphProps: { legend }
    } = useGraphContext();

    const first = getFirstTruthyPoint(data);
    const last = getFirstTruthyPoint([...data].reverse());

    if (!first || !last) return null;

    const [left, right] = legend.draw ? legend.draw([first, last]) : [`${first.rawData.x}`, `${last.rawData.x}`];

    return (
        <div className={classNames('legend')}>
            <div>{left}</div>
            <div>{right}</div>
        </div>
    );
};

export default Legend;
