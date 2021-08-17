import { GraphOptions, NormalizedPoint } from '../declare';

/** Конвертация данных */
export default function normalizeData(data: GraphOptions['data']): NormalizedPoint[] {
    return data.map(({ x: rawX, y: rawY, ...rest }) => {
        const rawXToNumber = Number(rawX);

        const x = Number.isNaN(rawXToNumber) ? +new Date(rawX as Date) : rawXToNumber;
        const y = Number(rawY);

        return { rawData: { x: rawX, y: rawY }, x, y, ...rest };
    });
}
