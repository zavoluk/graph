import type { ColorMap, ColorType } from 'components/Context/declare';

const DEFAULT_NEGATIVE_COLOR = '#FC304B';
const DEFAULT_NO_DIFF_COLOR = '#999999';
const DEFAULT_POSITIVE_COLOR = '#35C759';

/** Вернет список цветов. Если цвет не передан - возвращается цвет по умолчанию */
export default function getColorMap(customColors: Partial<ColorMap>) {
    const colorMap: ColorMap = {
        negative: DEFAULT_NEGATIVE_COLOR,
        noDiff: DEFAULT_NO_DIFF_COLOR,
        positive: DEFAULT_POSITIVE_COLOR
    };

    (Object.keys(colorMap) as ColorType[]).forEach(key => {
        colorMap[key] = customColors[key] || colorMap[key];
    });

    return colorMap;
}
