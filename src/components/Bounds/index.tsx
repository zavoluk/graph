import React, { FC } from 'react';

import { useGraphContext } from 'components/Context';

const Bounds: FC = () => {
    const {
        graphProps: { indent },
        svgProps: { height, width }
    } = useGraphContext();

    return (
        <g id='bounds'>
            <rect
                x={indent}
                y={indent}
                width={width - indent * 2}
                height={height - indent * 2}
                fill='none'
                stroke='#F4F4FA'
                strokeDasharray={`0, ${width}, ${width * 2}`}
            />
        </g>
    );
};

export default Bounds;
