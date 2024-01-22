export function throttle(cb: Function, delay = 250) {
    let shouldWait = false

    return (...args: any | undefined) => {
        if (shouldWait) return

        cb(...args)
        shouldWait = true
        setTimeout(() => {
            shouldWait = false
        }, delay)
    }
}