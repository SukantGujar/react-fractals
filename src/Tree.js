import observer from "@risingstack/nx-observe";
import memoize from "lodash.memoize";

let tree = observer.observable({}),
memoizedCalc = function () {
    const memo = {};

    const key = memoize(({ w, heightFactor, lean }) => [w,heightFactor, lean].join('-'));

    return (args) => {
        const memoKey = key(args);

        if (memo[memoKey]) {
            return memo[memoKey];
        }else{
            const { w, heightFactor, lean } = args;

            const trigH = heightFactor*w;

            const result = observer.observable({
                nextRight: Math.sqrt(trigH**2 + (w * (.5+lean))**2),
                nextLeft: Math.sqrt(trigH**2 + (w * (.5-lean))**2),
                A: Math.deg(Math.atan(trigH / ((.5-lean) * w))),
                B: Math.deg(Math.atan(trigH / ((.5+lean) * w)))
            });

            memo[memoKey] = result;
            return result;
        }
    }
}();