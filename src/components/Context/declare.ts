import { ReactNode, SVGProps } from 'react';

export type Axis = 'x' | 'y';

export type AxisTypeMap = { [x in Axis]: number };

/** Основной интерфейс точки */
export type Point<T = Record<string, any>> = {
    x: number | Date;
    y: number;
} & T;

/** Точка с конвертированными данными */
export type NormalizedPoint<T = Record<string, any>> = {
    /** Данные в том виде, в котором они были переданы */
    rawData: Partial<Point>;
    x: number;
    y: number;
} & T;

/** Дополненный интерфейс точки */
export type PointWithAdditionalData<T = Record<string, any>> = {
    /** Точка отсутствует на графике так как нет данных */
    skip?: boolean;
} & NormalizedPoint<T>;

/** Базовые атрибуты SVG */
export type GraphAttributes = SVGProps<SVGElement>;

export interface PointSettings {
    /**
     * Во сколько раз полупрозрачная граница больше радиуса точки
     *
     * @default 2.42
     */
    border?: number;
    /**
     * Радиус точки в пикселях
     *
     * @default 3.5
     */
    radius?: number;
    /**
     * Во сколько раз увеличивается точка при наведении
     *
     * @default 1.57
     */
    scale?: number;
}

export interface LineSettings {
    /**
     * Толщина линии в пикселях
     *
     * @default 2
     */
    width?: number;
}

export interface SegmentSettings {
    /** Цвет линии */
    color?: <T>(points: [PointWithAdditionalData<T>, PointWithAdditionalData<T>]) => string;
    /** Пунктирная линия */
    dash?: <T>(points: [PointWithAdditionalData<T>, PointWithAdditionalData<T>]) => boolean;
}

export interface LegendSettings {
    /** Подпись оси X. [Левая сторона, правая сторона] */
    draw?: <T>(points: [Point<T>, Point<T>]) => ReactNode[];
}

export type TooltipPoints = Record<'prev' | 'curr', Partial<Point>>;
export interface TooltipSettings {
    /**
     * Отображать тултип при наведении на точку
     *
     * @default true
     */
    enable?: boolean;
    /** Форматирование тултипа */
    format?: (
        /** Точки для сравнения */
        points: TooltipPoints,
        /** Текущий индекс точки из массива */
        currentIndex: number,
        /** Кол-во точек */
        total: number
    ) => {
        body: ReactNode;
        footer: ReactNode;
        header: ReactNode;
    };
}

export type ComparisonType = 'increase' | 'decrease';

export type ColorType = 'negative' | 'noDiff' | 'positive';
export type ColorMap = Record<ColorType, string>;

export type GraphOptions = {
    /**
     * Список цветов для точек/фона/ломаных
     *
     * negative - график убывает (финальное значение меньше первого)
     *
     * positive - график возрастает (финальное значение больше первого)
     *
     * noDiff - график возрастает (финальное и первое значение равны)
     */
    colorMap: Partial<ColorMap>;
    /**
     * Тип положительного изменения
     *
     * `increase` - финальное значение больше первого
     *
     * `decrease` - финальное значение меньше первого
     *
     * @default increase
     */
    comparisonType: ComparisonType;
    /** Список точек */
    data: Partial<Point>[];
    /** Опции подписей графика */
    legend: LegendSettings;
    /** Свойства линий на графике */
    lineSettings: LineSettings;
    /**
     * Отступ м/у точками и осью Y в пикселях
     *
     * @default 20
     */
    padding: number;
    /** Свойства точки на графике */
    pointSettings: PointSettings;
    /** Свой вариант отрисовки линий */
    segment: SegmentSettings;
    /** Настройки тултипа */
    tooltip: TooltipSettings;
    /**
     * Отображать границы графика
     *
     * @default true
     */
    withBorder: boolean;
    /**
     * Отображать фон графика
     *
     * @default true
     */
    withFill: boolean;
    /**
     * Отображать ломаную
     *
     * @default true
     */
    withLines: boolean;
    /**
     * Отображать точки
     *
     * @default true
     */
    withPoints: boolean;
};

export interface GraphContext extends GraphAttributes, GraphOptions {}

export interface PublicGraphProps extends Omit<GraphOptions, 'data'>, Pick<GraphOptions, 'data'>, GraphAttributes {}
