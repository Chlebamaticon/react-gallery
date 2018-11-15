import { Element } from '../interfaces';

export const createArray = (size, fill) => new Array(size).fill(fill);

export const scaleTo = (element: Element, { toHeight = 0, toWidth = 0 } = {}) => {
    const { height, width } = element;
    const scale = toWidth !== null 
        ? toWidth / width 
        : toHeight / height;

    return {
        height: Math.round(height * scale),
        width: Math.round(width * scale),
        scale,
    }
};

export const spreadToColumns = (list, {
    width = 0,
    columnWidth = 256,
    gap = 0
}) => {
    const columnsAmount = Math.floor(width / (columnWidth + gap));
    const heights = createArray(columnsAmount, 0);

    for (const element of list) {
        const minHeight = Math.min(...heights);
        const columnId = heights.findIndex(height => height <= minHeight);

        const offsetTop = (heights[columnId]) 
            ? heights[columnId] + gap 
            : heights[columnId];
        const offsetLeft = columnId * (columnWidth + gap)

        element.columnId = columnId;
        element.offsetTop = offsetTop;
        element.offsetLeft = offsetLeft;

        heights[columnId] = offsetTop + element.height;
    }

    return {
        list,
        height: Math.max(...heights),
        width: (columnsAmount * columnWidth) + (gap * (columnsAmount - 2))
    }
};

export { debounce } from './debounce';
export { throttle } from './throttle';
