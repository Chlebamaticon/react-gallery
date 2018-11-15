import * as React from 'react';

interface VirtualElementProps {
    element: any
}

export class VirtualElement extends React.PureComponent<VirtualElementProps> {
    
    render() {
        const { element } = this.props;
        const {
            width,
            height,
            render,
            offsetLeft: x,
            offsetTop: y,
        } = element;

        return (
            <div style={{
                height,
                width,
                transform: `translate(${ x }px, ${ y }px)`,
            }} className="virtual-element">
                { render({ height, width }) }
            </div>
        );
    }
}