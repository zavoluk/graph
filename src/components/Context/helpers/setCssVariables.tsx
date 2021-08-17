import tinycolor from 'tinycolor2';

import { PointSettings } from '../declare';

/** Установка css переменных */
export default function setCssVariables(params: { mainColor: string } & Required<PointSettings>) {
    const { border, mainColor, radius, scale } = params;
    const root = document.documentElement;

    root.style.setProperty('--point-scale', `${radius * scale}px`);
    root.style.setProperty('--point-border-width', `${radius * border}px`);
    root.style.setProperty('--point-color', mainColor);
    root.style.setProperty('--point-border-color', tinycolor(mainColor).setAlpha(0.1).toHex8String());
}
