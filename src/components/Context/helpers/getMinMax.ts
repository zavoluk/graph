import getFirstTruthyPoint from 'libs/getFirstTruthyPoint';

import { Axis, NormalizedPoint } from '../declare';

function getMax(_1st: number, _2nd: number) {
    return _1st > _2nd ? _1st : _2nd;
}

function getMin(_1st: number, _2nd: number) {
    return _1st < _2nd ? _1st : _2nd;
}

/** Высчитывает максимальные и минимальные значения координат */
export default function getMinMax(data: NormalizedPoint[]) {
    const { x: firstX, y: firstY } = (getFirstTruthyPoint(data) || {
        x: 0,
        y: 0
    }) as NormalizedPoint;

    const List = data.reduce(
        (acc, curr) => {
            const { x = firstX, y = firstY } = curr;

            return {
                max: { x: getMax(x, acc.max.x), y: getMax(y, acc.max.y) },
                min: { x: getMin(x, acc.min.x), y: getMin(y, acc.min.y) }
            };
        },
        { max: { x: firstX, y: firstY }, min: { x: firstX, y: firstY } }
    );

    return (params: { coordinate: Axis; type: 'min' | 'max' }) => List[params.type][params.coordinate];
}
