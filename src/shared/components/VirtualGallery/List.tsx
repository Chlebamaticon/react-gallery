import * as React from 'react';

import { ScaledElement } from './interfaces';
import { VirtualElement } from './Element';

interface VirtualListProps {
    list: ScaledElement[],
    scrollTop: number | null,
    clientHeight: number | null,
}

export class VirtualList extends React.Component<VirtualListProps> {
    
    clientViewFilter(scrollTop, clientHeight) {
        const { list } = this.props;

        const filter = element =>  (
            (
                element.offsetTop <= scrollTop 
                || element.offsetTop <= scrollTop + clientHeight
            ) && (
                element.offsetTop + element.height >= scrollTop 
                || element.offsetTop + element.height >= scrollTop + clientHeight
            )
        );
        
        return list.filter(filter);
    }

    render() {
        const { clientHeight, scrollTop } = this.props;
        const elements = this.clientViewFilter(scrollTop, clientHeight);

        return (
            <React.Fragment>
                { 
                    elements.map(element => <VirtualElement key={element.id} element={element} />) 
                }
            </React.Fragment>
        );
    }
    
}