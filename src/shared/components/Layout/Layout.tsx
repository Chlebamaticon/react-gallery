import * as React from 'react';

type LayoutProps = {
    orientation?: 'landspace' | 'portrait'
} & React.Props<any>;

export const Layout = (props: LayoutProps = { orientation: 'portrait' }) => {

    return (
        <React.Fragment>
            <div className="l-container">
                { props.children }
            </div>
        </React.Fragment>
    );
};