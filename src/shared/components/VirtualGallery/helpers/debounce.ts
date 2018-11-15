type ProcedureFunction = (...args: any[]) => void

export const debounce = <F extends ProcedureFunction>(fn: F, delay, isImmediate = false): F => {
    let timeoutId: any;

    return function(this: any, ...args: any[]) {
        const context = this;

        const doLater = () => {
            timeoutId = undefined;
            if (!isImmediate)
                fn.apply(context, args);
        };

        const shouldCallNow = isImmediate && timeoutId === undefined;

        if ( timeoutId !== undefined )
            clearTimeout(timeoutId);

        timeoutId = setTimeout(doLater, delay);

        if ( shouldCallNow )
            fn.apply(context, args);
    } as any as F;
};