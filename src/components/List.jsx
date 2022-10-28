import React from "react";
import {v4 as uuidv4} from "uuid";
import PropTypes from 'prop-types';

const List = ({isLoading, list}) => (
    <>
        {isLoading && <div className='loader'>Loading...</div>}
        {!isLoading && !list.length && <div className='loader'>No results!</div>}
        {!isLoading && !!list.length &&
            <div className='list-wrapper'>
                <ul className="list">
                    {list.map(({title = '', tags = []}) =>
                        <li key={uuidv4()} className="list-item">
                            <span className='list-item__title'>{title}</span>
                            {!!tags && tags.join(', ')}
                        </li>)}
                </ul>
            </div>
        }
    </>
);

List.propTypes = {
    list: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
}

export default List;