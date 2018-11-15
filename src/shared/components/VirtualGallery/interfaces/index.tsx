export interface Element {
    id: string | number,
    height: number,
    width: number,
    render: (...args: any[]) => JSX.Element
}

export interface ScaledElement extends Element {
    original: {
        height: number,
        width: number,
    }
}