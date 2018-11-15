interface throttleWrapper {
    (...args: any[]): void
}

export const throttle = (callback, delay) => {
    let isThrottled = false;
    let args, context;

    function throttleWrapper(this: any) {
        if ( isThrottled ) {
            args = arguments;
            context = this;
            return;
        }

        isThrottled = true;
        callback.apply(this, arguments);

        setTimeout(() => {
            isThrottled = false;
            if ( args ) {
                throttleWrapper.apply(context, args);
                args = context = null;
            }
        }, delay);
    }

    return throttleWrapper;
};