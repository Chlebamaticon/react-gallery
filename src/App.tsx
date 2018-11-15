import * as React from 'react';
import './assets/styles/index.scss';
import { Layout } from '@shared/components/Layout';
import { VirtualGallery } from '@shared/components/VirtualGallery';
export class App extends React.Component {
    generateImages(amount: number) {
        return new Array(amount)
            .fill(null)
            .map((_, id) => {
                const height = Math.trunc(Math.random() * 1024 + 128);
                const width = Math.trunc(Math.random() * 1024 + 128);

                return {
                    id,
                    width,
                    height,
                    render: props => (
                        <div>
                            <img src={`http://www.placekitten.com/${ width }/${ height }`} {...props} />
                        </div>
                    ),
                }
            });
    }

    render() {
        return (
            <Layout>
                <VirtualGallery list={this.generateImages(128)} gap={16} />
            </Layout>
        );
    }
}
