import type { AxisTypeMap, NormalizedPoint, PointWithAdditionalData } from 'components/Context/declare';

import getCoordinate from 'libs/getCoordinate';

interface ListItem {
    coordinates: AxisTypeMap;
    rawData: PointWithAdditionalData['rawData'];
}

/** у точки нет данных */
const noData = ({ x, y }: ListItem['rawData']) =>
    Number.isNaN(x) || x === undefined || Number.isNaN(y) || y === undefined;

/**
 * Выбрать ближайшую не пустую координату
 *
 * Приоритет на предыдущую координату
 */
const getClosestCoordinates = (curr: ListItem, prior1?: ListItem, prior2?: ListItem): ListItem => {
    return (noData(curr.coordinates) ? prior1 || prior2 : curr) as ListItem;
};

/**
 * Формирование списка точек с координатами и параметрами отрисовки
 *
 * Список используется в построении ломанных и фоновой заливки
 */

export default function dataToCoordinates(params: {
    data: NormalizedPoint[];
    height: number;
    indent: number;
    min: AxisTypeMap;
    padding: number;
    stepMap: AxisTypeMap;
    width: number;
}) {
    const { data, height, indent, width } = params;
    // список с точек с координатами
    const list: ListItem[] = data.map(({ rawData, x, y }) => {
        return {
            coordinates: {
                x: getCoordinate.calculate({ position: x, type: 'x' }),
                y: getCoordinate.calculate({ position: y, type: 'y' })
            },
            rawData
        };
    });

    return list.reduce((acc, curr, index) => {
        const { rawData } = curr;
        const isFirstPoint = index === 0;
        const isLastPoint = index === list.length - 1;
        const flipY = height - indent; // устанавливаем начало координат влево-вниз
        const skip = noData(rawData);
        const next = list[index + 1] as ListItem | undefined;
        const prev = list[index - 1] as ListItem | undefined;

        const closestCoordinates = getClosestCoordinates(curr, prev, next);
        const {
            coordinates: { x, y }
        } = closestCoordinates;

        if (isFirstPoint) {
            // Первая точка должна быть в (0, 0) для замыкания заливки
            acc.push({ rawData: { x: undefined, y: undefined }, skip: true, x: indent, y: flipY });

            // у текущей и следующей точки есть данные
            const currAndNextHasData = !skip && next && !noData(next.rawData);

            if (!currAndNextHasData) {
                // в случае если первая точка не имеет данных - рисуем нормаль от следующей точки к оси Y
                acc.push({ rawData: { x: undefined, y: undefined }, skip: true, x: indent, y });

                return acc;
            } else {
                acc.push({ rawData, skip, x, y });

                return acc;
            }
        }

        if (isLastPoint) {
            const x = skip ? width - indent : closestCoordinates.coordinates.x;

            if (skip) {
                // у последней точки нет данных - рисуем нормаль до правой границы графика
                acc.push({ rawData, skip: true, x, y });
            } else {
                acc.push({ rawData, skip, x, y });
            }

            // последняя точка должна быть в правой нижней границе графика для замыкания заливки
            acc.push({ rawData: { x: undefined, y: undefined }, skip: true, x, y: flipY });

            return acc;
        }

        acc.push({ rawData, skip, x, y });

        return acc;
    }, [] as PointWithAdditionalData[]);
}
