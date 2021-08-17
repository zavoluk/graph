import React, { FC } from 'react';
import { setDI } from '@trend-dev/trendtech-ui/DI';
import getColorMap from 'helpers/getColorMap';

import Container from 'components/Container';
import GraphContextProvider from 'components/Context';
import type { PublicGraphProps } from 'components/Context/declare';

import mergeProps, { graphDefaultProps } from 'const/GraphDefaultProps';

setDI({ namespace: 'trendagent' });

export const Graph: FC<PublicGraphProps> = props => {
    const { colorMap, data, height, width } = props;

    const ctxValue = {
        ...mergeProps(props),
        colorMap: getColorMap(colorMap || {}),
        data,
        height,
        width
    };

    return (
        <GraphContextProvider value={ctxValue}>
            <Container />
        </GraphContextProvider>
    );
};

Graph.defaultProps = graphDefaultProps;

export default Graph;
