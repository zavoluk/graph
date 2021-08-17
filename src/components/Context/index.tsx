import React, { createContext, FC, useContext } from 'react';
import tinycolor from 'tinycolor2';

import getClosestPoint from 'libs/getClosestPoint';
import getCoordinate from 'libs/getCoordinate';

import { ColorMap, GraphContext, LineSettings, NormalizedPoint, PointSettings, TooltipSettings } from './declare';
import dataToCoordinates from './helpers/dataToCoordinates';
import _getMinMax from './helpers/getMinMax';
import getSize from './helpers/getSize';
import getStepValue from './helpers/getStepValue';
import normalizeData from './helpers/normalizeData';
import setCssVariables from './helpers/setCssVariables';

const Ctx = createContext({} as GraphContext);
const toHex8String = (color: string) => tinycolor(color).toHex8String();

export const useGraphContext = () => {
    const {
        colorMap,
        comparisonType,
        data: _data,
        height,
        legend,
        lineSettings: _lineSettings,
        padding,
        pointSettings: _pointSettings,
        segment,
        tooltip: _tooltip,
        width,
        withBorder,
        withFill,
        withLines,
        withPoints,
        ..._svgProps
    } = useContext(Ctx);

    const pointSettings = _pointSettings as Required<PointSettings>;
    const tooltip = _tooltip as Omit<Required<TooltipSettings>, 'format'> & TooltipSettings;
    const lineSettings = _lineSettings as Required<LineSettings>;

    const { negative: negativeColor, noDiff: noDiffColor, positive: positiveColor } = colorMap as ColorMap;

    const data = normalizeData(_data);
    const getMinMax = _getMinMax(data);

    const searchParameters = {
        searchFunction: (point: NormalizedPoint) => point.y !== undefined && !Number.isNaN(point.y)
    };
    // поиск первой и последней НЕ пустой точки
    const first = getClosestPoint(data, { ...searchParameters });
    const last = getClosestPoint(data, {
        reverse: true,
        ...searchParameters
    });

    // отступы для компенсации увеличенных размеров точки при наведении
    const indent = pointSettings.radius * pointSettings.border;

    // максимальные значения по осям
    const max = {
        x: getMinMax({ coordinate: 'x', type: 'max' }),
        y: getMinMax({ coordinate: 'y', type: 'max' })
    };

    // минимальные значения по осям
    const min = {
        x: getMinMax({ coordinate: 'x', type: 'min' }),
        y: getMinMax({ coordinate: 'y', type: 'min' })
    };

    const svgProps = {
        ..._svgProps,
        height: getSize(height),
        width: getSize(width)
    };

    // Значение Y краевых точек одинаковы
    const _noDiff = first?.y === last?.y;

    // Произошло положительное изменение графика
    const isPositiveChange = {
        decrease: (last?.y || NaN) < (first?.y || NaN),
        increase: (last?.y || NaN) > (first?.y || NaN)
    }[comparisonType];

    // Вычисленные шаги по осям
    const stepMap = getStepValue({ height: svgProps.height, indent, max, min, padding, width: svgProps.width });

    // Цвета точек/полигонов/кривых
    const mainColor = _noDiff
        ? toHex8String(noDiffColor)
        : isPositiveChange
        ? toHex8String(positiveColor)
        : toHex8String(negativeColor);

    getCoordinate.storeData({ height: svgProps.height, indent, min, padding, stepMap });
    setCssVariables({ mainColor, ...pointSettings });

    return {
        coordinateList: dataToCoordinates({
            data,
            height: svgProps.height,
            indent,
            min,
            padding,
            stepMap,
            width: svgProps.width
        }),
        data,
        graphProps: {
            indent,
            legend,
            lineSettings,
            mainColor,
            max,
            min,
            padding,
            pointSettings,
            segment,
            stepMap,
            tooltip,
            withBorder,
            withFill,
            withLines,
            withPoints
        },
        svgProps
    };
};

const GraphContextProvider: FC<{ value: GraphContext }> = ({ children, value }) => (
    <Ctx.Provider value={value}>{children}</Ctx.Provider>
);

export default GraphContextProvider;
