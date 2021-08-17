import tinycolor from 'tinycolor2';

/** Возвращает цвет на *amount* процентов светлее. 100% - белый цвет */
export default function lighten(color: string, amount: number) {
    return tinycolor(color).lighten(amount).toHex8String();
}
