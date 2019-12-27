import React, {
    useReducer,
} from 'react';

import {
    Reducer as ReducerContext
} from './contexts';

import {
    DatabaseInput,
    List
} from './components';

/*
    Reducer function should be placed outside the component
    otherwise it will fire twice
*/
function reducer(_state, { type, args })
{
    // Create a copy of the current state
    let state = { ..._state };

    // Change state
    switch(type)
    {
        case "ADD_PLAYER":
            state.players.push(args.name);
        break;
        case "DELETE_PLAYER":
            state.players.splice(args.index, 1);
        break;
        default:break;
    }
    
    // Update state
    return state;
}

function Hero()
{
    // Declare a reducer
    const [state, dispatch] = useReducer(
        reducer,
        // Default Value
        {
            players: []
        }
    );

    return (
        <ReducerContext.Provider value={{
            state,
            dispatch
        }}>
            <DatabaseInput />
            <List />
        </ReducerContext.Provider>
    );
}

export default Hero;