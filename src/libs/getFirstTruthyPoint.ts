import type { NormalizedPoint } from 'components/Context/declare';

import getClosestPoint from './getClosestPoint';

/** Получить первую точку, которая имеет не пустую информацию */
export default function getFirstTruthyPoint(data: NormalizedPoint[]) {
    return getClosestPoint(data, { searchFunction: point => !Number.isNaN(point.x) && !Number.isNaN(point.y) });
}
