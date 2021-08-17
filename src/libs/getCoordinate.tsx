import type { Axis, AxisTypeMap } from 'components/Context/declare';

interface ICoordinate {
    height: number;
    indent: number;
    min: AxisTypeMap;
    padding: number;
    stepMap: AxisTypeMap;
}

interface Coordinate extends ICoordinate {}

/** Высчитывание координат для точки с учетом поправок */
class Coordinate {
    constructor() {
        this.height = NaN;
        this.indent = NaN;
        this.min = {
            x: NaN,
            y: NaN
        };
        this.stepMap = {
            x: NaN,
            y: NaN
        };
        this.padding = NaN;
    }

    storeData(params: ICoordinate) {
        Object.assign(this, { ...params, height: params.height || 0 });
    }

    calculate(params: { position: number; type: Axis }) {
        const { height, indent, min, padding, stepMap } = this;

        const { position, type } = params;

        const list = {
            x: position * stepMap.x + indent - min.x * stepMap.x, // вычитаем координаты минимальной точки для сдвига всего графика влево
            y: height - indent - padding - position * stepMap.y + min.y * stepMap.y
        };

        return list[type];
    }
}

export default new Coordinate();
