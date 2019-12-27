import React, { useContext } from 'react';
import './main.css';

import {
    Reducer as ReducerContext
} from '../../contexts';

function List()
{
    const { state: { players }, dispatch } = useContext(ReducerContext);
    
    return (
        <ol>
            {
                players.map((io, ia) => (
                    <li
                        key={ ia }
                        className="list-item"
                        onClick={() => dispatch({
                            type: "DELETE_PLAYER",
                            args: {
                                index: ia
                            }
                        })}>
                        { io }
                    </li>
                ))
            }
        </ol>
    );
}

export default List;