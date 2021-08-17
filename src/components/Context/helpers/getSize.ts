import { SVGProps } from 'react';

/** Перевод значений размеров в число в число */
export default function getSize(value: SVGProps<SVGElement>['height'] | SVGProps<SVGElement>['width']) {
    if (value === undefined || Number.isNaN(+value)) return 0;

    return +value;
}
