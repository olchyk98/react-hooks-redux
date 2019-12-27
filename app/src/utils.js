// Oles Odynets @2018-2020
// Delete imports if no React Packages in the project:
import {
    useState,
    useEffect
} from 'react';

const router = {
    "functions": {
        constructClassName(init, state) {
            return Object.entries({
                ...state,
                [init]: true
            }).filter(p => p[1]).map(p => p[0]).join(' ');
        },
        verifyStrings(...f) {
            for (let ma of f) {
                if (!ma || !ma.replace(/\s|\n/g, "").length) {
                    return false;
                }
            }

            return true;
        },
        // shortLevel - 1(full date), 2(time), 3(seconds to fulldate)
        convertTime(time, shortLevel) { // (%"?")1553017480428 => 19 March, 2019 18:44
            // Detect time format (number, string)
            let a = new Date(time);

            if (parseInt(time).toString() === time) { // string format
                a = new Date(parseInt(time))
            }

            const mn = [
                "Jan",
                "Feb",
                "March",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ];
            const fk = a => (a.toString().length !== 1) ? a : "0" + a;

            let b = null; // return

            switch (shortLevel) {
                case 1: // full date // 19 March, 2019 18:44
                    b = `${ fk(a.getDate()) } ${ mn[ a.getMonth() ] }, ${ a.getFullYear() } ${ fk(a.getHours()) }:${ fk(a.getMinutes()) }`;
                    break;
                case 2: // hours:minutes
                    // TODO
                    break;
                case 3: // seconds to fulldate
                    // TODO
                    break;
                default:
                    break;
            }

            return b;
        },
        shortNumber(a) { // 4913 => 4.9k
            if (a < 1e3) return a + "";
            if (a >= 1e3 && a < 1e6) return +(a / 1e3).toFixed(1) + "K";
            if (a >= 1e6 && a < 1e9) return +(a / 1e6).toFixed(1) + "M";
            if (a >= 1e9 && a < 1e12) return +(a / 1e9).toFixed(1) + "B";
            if (a >= 1e12) return +(a / 1e12).toFixed(1) + "T";
            return a;
        },
        intRange(s = 0, e = 10) { // [0, ..., 10]
            let a = [];
            for (let ma = s; ma <= e; ma++) a.push(ma);

            return a;
        }
    },
    'hooks': {
        // useImperativeHandle for multiple refs in the same component
        useRefEvents(ref, events = {}, dependencies = null) {
            useEffect(() => {
                // Get list of active listeners
                const { activeListeners } = ref.current;

                for (const event in events) {
                    if(activeListeners && event in activeListeners)
                    {
                        ref.current.removeEventListener(event, activeListeners[event]);
                    }
                    
                    // Add a new one
                    ref.current.addEventListener(
                        event,
                        events[event]
                    );

                    // Update list of active listeners
                    if(activeListeners) {
                        ref.current.activeListeners[event] = events[event];
                    } else {
                        ref.current.activeListeners = {
                            [event]: events[event]
                        }
                    }
                }
            // NOTE: If empty -> Fire on each render
                // If array -> fire on each dep change
            // eslint-disable-next-line
            }, dependencies);
            
            return [];
        },
        useForceUpdate() {
            return useState()[1];
        }
    }
}

export default router;