/** Use this to delay ajax calls long enough to show loading */
export function delay(duration = 1000){
    return new Promise(res=>setTimeout(res,duration))
}
