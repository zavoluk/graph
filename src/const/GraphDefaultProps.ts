import type { GraphContext, PublicGraphProps } from 'components/Context/declare';

/** Стандартные свойства графика */
export const graphDefaultProps: Omit<GraphContext, 'setRef'> = {
    colorMap: {},
    comparisonType: 'increase',
    data: [],
    height: 200,
    legend: {},
    lineSettings: {
        width: 2
    },
    padding: 20,
    pointSettings: {
        border: 2.42,
        radius: 3.5,
        scale: 1.57
    },
    segment: {},
    tooltip: {
        enable: true
    },
    width: 730,
    withBorder: true,
    withFill: true,
    withLines: true,
    withPoints: true
};

/** Слияние стандартных и переданных свойств графика */
const mergeProps = (props: PublicGraphProps): Omit<GraphContext, 'setRef'> => ({
    ...graphDefaultProps,
    ...props,
    lineSettings: {
        ...props.lineSettings,
        ...graphDefaultProps.lineSettings
    },
    pointSettings: {
        ...props.pointSettings,
        ...graphDefaultProps.pointSettings
    },
    tooltip: {
        ...props.tooltip,
        ...graphDefaultProps.tooltip
    }
});

export default mergeProps;
