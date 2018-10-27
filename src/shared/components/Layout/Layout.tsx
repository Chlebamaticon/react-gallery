import * as React from 'react';

type LayoutProps = {
    orientation?: 'landspace' | 'portrait'
} & React.Props<any>;

export const Layout = (props: LayoutProps = { orientation: 'portrait' }) => {

    return (
        <React.Fragment>
            <div className="l-topbar">
            
            </div>

            <div className="l-container">
                
                <div className="l-sidebar">
                
                </div>
                
                <div className="l-router">
                    { props.children }
                </div>

            </div>
        </React.Fragment>
    );
};