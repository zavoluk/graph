/** Поиск ближайшего элемента массива */
export default function getClosestPoint<T>(
    list: T[],
    params: { reverse?: boolean; searchFunction: (i: T) => boolean }
) {
    const { reverse, searchFunction } = params;
    const _list = [...list];

    if (reverse) _list.reverse();

    return _list.find(searchFunction);
}
