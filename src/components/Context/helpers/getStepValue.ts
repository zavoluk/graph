import { AxisTypeMap } from '../declare';

/** Расчёт шага для осей */
export default function getStepValue(params: {
    height: number;
    indent: number;
    max: AxisTypeMap;
    min: AxisTypeMap;
    padding: number;
    width: number;
}) {
    const { height, indent, max, min, padding, width } = params;

    return {
        x: (width - indent * 2) / (max.x - min.x),
        y: (height - indent * 2 - padding * 2) / (max.y - min.y)
    };
}
