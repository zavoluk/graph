import React, { FC } from 'react';

import { useGraphContext } from 'components/Context';

import lighten from 'libs/lighten';

const Fill: FC = () => {
    const {
        coordinateList,
        graphProps: { mainColor }
    } = useGraphContext();

    // Строка с координатами для построения заливки графика
    const points = coordinateList
        .filter(({ x, y }) => !Number.isNaN(x) && !Number.isNaN(y))
        .map(({ x, y }) => `${x} ${y}`)
        .join();

    return (
        <g id='fill'>
            <defs>
                <linearGradient id='gradient' x1='0' x2='0' y1='0' y2='1'>
                    <stop offset='0' stopColor={lighten(mainColor, 20)} />
                    <stop offset='100%' stopColor={lighten(mainColor, 100)} />
                </linearGradient>
            </defs>
            <polygon points={points} fill='url(#gradient)' />
        </g>
    );
};

export default Fill;
