import React, {
    useContext,
    useRef,
    useState
} from 'react';

import {
    Reducer as ReducerContext
} from '../../contexts';

import router from '../../utils';
const { useRefEvents } = router.hooks;

function DatabaseInput()
{
    const { dispatch } = useContext(ReducerContext);
    const [value, setValue] = useState("");
    const inputRef = useRef();
    const buttonRef = useRef();
    
    useRefEvents(inputRef, {
        'input': ({ target: { value: v } }) => {
                setValue(v);
            }
        },
        []
    );

    useRefEvents(
        buttonRef,
        {
            'click': (_) => {
                // Break if input field is empty
                if(!value?.replace(/\s|\n/g, "").length) return;

                // Clear Input
                setValue( inputRef.current.value = "" );
                
                // Dispatch
                dispatch(
                    {
                        type: 'ADD_PLAYER',
                        args: {
                            name: value
                        }
                    }
                );
            },
        },
        [value]
    );

    return (
        <>
            <input
                type="text"
                placeholder="Player Name, e.g Joycoin, Json, Java"
                ref={ inputRef }
            />
            <button ref={ buttonRef }>Add</button>
        </>
    );
}

export default DatabaseInput;