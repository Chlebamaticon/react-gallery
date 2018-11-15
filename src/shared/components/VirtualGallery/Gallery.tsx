import * as React from 'react';
import { VirtualExpander } from './Expander';
import { VirtualList } from './List';
import { Element } from './interfaces';
import { debounce, scaleTo, throttle, spreadToColumns } from './helpers';

interface VirtualGalleryProperties {
    gap: number,
}

interface VirtualGalleryProps extends VirtualGalleryProperties {
    list: Element[]
}

export class VirtualGallery extends React.Component<VirtualGalleryProps> {
    private container: React.RefObject<HTMLDivElement> = React.createRef();
    private root: React.RefObject<HTMLDivElement> = React.createRef();

    state = {
        list: [],
        height: 0,
        width: 0,
        scrollTop: 0,
        clientHeight: 0
    }

    getScaledList() {
        const { list } = this.props;

        return list.map(element => {
            const { height, width } = element;

            return {
                ...element,
                ...scaleTo(element, { toWidth: 256 }),
                original: {
                    height,
                    width
                },
            }
        });
    }

    componentDidMount() {
        const { gap } = this.props;
        const { current: root } = this.root;
        const { current: container } = this.container;

        if ( !container || !root )
            return;

        const state = spreadToColumns(this.getScaledList(), {
            width: container.clientWidth,
            gap,
            columnWidth: 256
        });

        if ( root )
            root.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onResize);

        this.setState({ ...state, clientHeight: root && root.offsetHeight });
    }

    componentWillUnmount() {
        const { current: root } = this.root;
        
        if ( root )
            root.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onResize);
    }

    // @Throttle(250)
    onScroll = throttle(event => {
        const { target: { scrollTop, clientHeight } } = event;

        this.setState({ scrollTop, clientHeight });
    }, 16.6);

    onResize = debounce(event => {
        const { 
            container: { current: container }, 
            root: { current: root } 
        } = this;

        if ( container && root ) {
            const { parentElement } = root;

            root.scrollTop = 0;
        }
    }, 300);

    render() {
        const { 
            list, height, 
            width, 
            clientHeight, 
            scrollTop
        } = this.state;

        return (
            <div className="virtual-container" ref={this.root}>
                <div className="virtual-container__container" ref={this.container}>

                    <div className="virtual-container__expander">
                        <VirtualExpander height={ height } width={ width } />
                    </div>

                    <div className="virtual-container__list-wrapper">
                        <div className="virtual-container__list-inner-wrapper">
                            <VirtualList
                                list={ list }
                                scrollTop={ scrollTop }
                                clientHeight={ clientHeight }
                            />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}