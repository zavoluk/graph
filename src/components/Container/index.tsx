import React, { FC } from 'react';
import BEMHelper from '@trend-dev/trendtech-ui/libs/utils/BEMHelper';

import Bounds from 'components/Bounds';
import Fill from 'components/Fill';
import Legend from 'components/Legend';
import Lines from 'components/Lines';
import Points from 'components/Points';

import { useGraphContext } from '../Context';

const classNames = BEMHelper('graph');

const Container: FC = () => {
    const {
        data,
        graphProps: { indent, withBorder, withFill, withLines, withPoints },
        svgProps
    } = useGraphContext();

    if (!data.length) return null;

    return (
        <div className={classNames()} style={{ padding: `0 ${indent}px` }}>
            <svg
                viewBox={`0 0 ${svgProps.width} ${svgProps.height}`}
                className={classNames('svg')}
                width={svgProps.width}
                height={svgProps.height}
                style={{ margin: `0 -${indent}px` }}
            >
                {withFill && <Fill />}
                {withLines && <Lines />}
                {withBorder && <Bounds />}
                {withPoints && <Points />}
            </svg>
            <Legend />
        </div>
    );
};

export default Container;
