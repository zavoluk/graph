import React, { FC } from 'react';

import { useGraphContext } from 'components/Context';
import type { NormalizedPoint, PointWithAdditionalData } from 'components/Context/declare';

import lighten from 'libs/lighten';

/** Формирование списка с координатами на рисования отрезков */
const getLineList = (points: PointWithAdditionalData[]) => {
    const list: {
        coordinates: [number, number, number, number];
        rawData: PointWithAdditionalData['rawData'];
        skip: boolean;
    }[] = [];

    points.forEach((curr, index) => {
        const next = points[index + 1] as NormalizedPoint | undefined;
        const prev = points[index - 1] as NormalizedPoint | undefined;

        if (next) {
            const { skip, x: _x, y: _y } = curr;
            const noValue = Number.isNaN(_x) || Number.isNaN(_y);
            const nextNoValue = Number.isNaN(next.x) || Number.isNaN(next.y);

            const x1 = noValue ? prev?.x || 0 : _x;
            const y1 = noValue ? prev?.y || 0 : _y;
            const x2 = nextNoValue ? x1 : next.x;
            const y2 = nextNoValue ? y1 : next.y;

            list.push({ coordinates: [x1, y1, x2, y2], rawData: curr.rawData, skip: !!skip });
        }
    });

    return list;
};

const Lines: FC = () => {
    const {
        coordinateList,
        graphProps: { lineSettings, mainColor, segment }
    } = useGraphContext();

    const points = getLineList(coordinateList);
    const setColor = segment?.color ? segment.color : () => undefined;
    const setDash = segment?.dash ? segment.dash : () => undefined;

    return (
        <g id='lines'>
            {points.map((_curr, index) => {
                // Не рисуем первую и последнюю линии, так как они лежат на границах графика
                const isFirstOrLast = index === 0 || index === points.length - 1;

                if (!isFirstOrLast) {
                    const {
                        coordinates: [x1, y1, x2, y2],
                        skip,
                        rawData
                    } = _curr;

                    const _next = points[index + 1] || _curr;

                    const currentPoint = { rawData, skip, x: x1, y: y1 };
                    const nextPoint = {
                        rawData: _next.rawData,
                        skip: _next.skip,
                        x: _next.coordinates[0],
                        y: _next.coordinates[1]
                    };

                    return (
                        <line
                            strokeWidth={2}
                            key={index.toString()}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={lighten(setColor([currentPoint, nextPoint]) || mainColor, 30)}
                            strokeDasharray={setDash([currentPoint, nextPoint]) ? lineSettings.width : 0}
                        />
                    );
                }

                return null;
            })}
        </g>
    );
};

export default Lines;
