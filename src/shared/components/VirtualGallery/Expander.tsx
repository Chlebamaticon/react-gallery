import * as React from 'react';

interface VirtualExpanderProps {
    height: number,
    width: number
}

export const VirtualExpander = (props: VirtualExpanderProps) => (
    <div 
        className="virtual-expander"
        style={props}
    ></div>
);