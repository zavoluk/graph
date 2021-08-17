import React, { ComponentProps, FC, SVGAttributes } from 'react';
import Tooltip from '@trend-dev/trendtech-ui/components/UI/Tooltip';
import BEMHelper from '@trend-dev/trendtech-ui/libs/utils/BEMHelper';
import { formatNumber } from '@trend-dev/trendtech-ui/libs/utils/formatNumber';

import { useGraphContext } from 'components/Context';
import type { NormalizedPoint } from 'components/Context/declare';
import Info from 'components/Info';

import getCoordinate from 'libs/getCoordinate';

const classes = BEMHelper('points');

const Circle: FC<SVGAttributes<SVGCircleElement>> = props => <circle {...props} className={classes('point')} />;

/** Рисует точки */
const Points: FC = () => {
    const {
        data,
        graphProps: {
            pointSettings: { radius },
            tooltip
        }
    } = useGraphContext();

    /** Если передано форматирование тултипа - используем его */
    const formatTooltip = (params: {
        index: number;
        points: {
            curr: NormalizedPoint;
            prev: NormalizedPoint;
        };
        total: number;
    }): ComponentProps<typeof Info> => {
        const { index, points, total } = params;
        const { curr, prev } = points;

        if (tooltip.format) return tooltip.format({ curr: curr.rawData, prev: prev.rawData }, index, total);

        const isFirst = index === 0;

        return {
            body: formatNumber(curr.rawData.y || 0),
            // разница м/у текущей и предыдущей точкой
            footer: formatNumber((curr.y || 0) - (isFirst ? 0 : data[index - 1].y)),
            header: typeof curr.rawData.x === 'number' ? formatNumber(curr.rawData.x) : `${curr.rawData.x}`,
            isDefault: true
        };
    };

    return (
        <g id='points' className={classes()}>
            {data.map((curr, index) => {
                const { x, y } = curr;

                if (!Number.isNaN(x) && !Number.isNaN(y)) {
                    const isFirst = index === 0;
                    const props = {
                        cx: getCoordinate.calculate({ position: x, type: 'x' }),
                        cy: getCoordinate.calculate({ position: y, type: 'y' }),
                        r: radius
                    };

                    if (tooltip.enable) {
                        const infoProps = formatTooltip({
                            index,
                            points: {
                                curr: curr,
                                prev: isFirst ? curr : data[index - 1]
                            },
                            total: data.length
                        });

                        return (
                            <Tooltip key={String(index)} kind='white' title={<Info {...infoProps} />}>
                                <Circle {...props} />
                            </Tooltip>
                        );
                    }

                    return <Circle {...props} />;
                }

                return null;
            })}
        </g>
    );
};

export default Points;
