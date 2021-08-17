import React, { ComponentProps, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { getRandomData, getRandomDataWithEmptyPoints } from 'helpers/getRandomData';
import tinycolor from 'tinycolor2';

import Graph from './';

const defaultArgTypes = {
    colorMap: {
        control: false
    },
    data: {
        control: false
    },
    legend: {
        control: false
    },
    pointSettings: {
        control: false
    },
    segment: {
        control: false
    }
};

export default {
    argTypes: defaultArgTypes,
    args: { ...Graph.defaultProps },
    component: Graph,
    title: 'График'
} as Meta;

const Template: Story<ComponentProps<typeof Graph>> = args => {
    const [data, setData] = useState(getRandomData());
    const handleClick = () => {
        setData(getRandomData());
    };

    return (
        <>
            <Graph {...args} data={data} />
            <br />
            <br />
            <br />
            <button onClick={handleClick}>Новые случайные данные</button>
        </>
    );
};

export const _default = Template.bind({});
_default.storyName = 'Значения по умолчанию';

export const ColorSegment = Template.bind({});
ColorSegment.storyName = 'Свой цвет линии для определенных сегментов';
ColorSegment.args = {
    segment: {
        color: ([p1, p2]) => ((p1.y || 0) < (p2.y || 0) ? 'green' : 'red')
    }
};

export const TooltipFormat = Template.bind({});
TooltipFormat.storyName = 'Форматирование тултипа точки';
TooltipFormat.args = {
    tooltip: {
        format: ({ curr, prev }) => ({
            body: <strong>Значение: {curr.y}</strong>,
            footer: `Разница: ${(curr.y || 0) - (prev.y || 0)}`,
            header: <small>Ось X: {curr.x}</small>
        })
    }
};

export const LegendFormat = Template.bind({});
LegendFormat.storyName = 'Форматирование подписи на границах оси Х';
LegendFormat.args = {
    legend: {
        draw: ([left, right]) => [<strong key={1}>Левая сторона {left.x}</strong>, `Правая сторона ${right.x}`]
    }
};

const _CustomColorMap: Story<ComponentProps<typeof Graph>> = args => {
    function randomize() {
        return {
            negative: tinycolor.random().toHex8String(),
            noDiff: tinycolor.random().toHex8String(),
            positive: tinycolor.random().toHex8String()
        };
    }

    const [colorMap, setColorMap] = useState(randomize());
    const handleClick = () => {
        setColorMap(randomize());
    };

    return (
        <>
            <Graph {...args} colorMap={colorMap} />
            <br />
            <br />
            <button onClick={handleClick}>Сделать &nbsp;&nbsp; К Р А С И В О</button>
        </>
    );
};

export const CustomColorMap = _CustomColorMap.bind({});
CustomColorMap.storyName = 'Использование цветов';
CustomColorMap.args = {
    data: getRandomData(),
    segment: {
        color: ([p1, p2]) => ((p1.y || 0) < (p2.y || 0) ? 'green' : 'red')
    }
};

export const DashSegment: Story<ComponentProps<typeof Graph>> = args => <Graph {...args} />;
DashSegment.storyName = 'Пунктирная линия для определенных сегментов';
DashSegment.args = {
    data: getRandomDataWithEmptyPoints,
    segment: {
        dash: ([p1, p2]) => !!(p1.skip || p2.skip)
    },
    withFill: false
};
