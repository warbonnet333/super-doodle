import React from "react";
import {v4 as uuidv4} from "uuid";
import PropTypes from 'prop-types';
import {FILTERS} from "../constants/constants";

const Filter = ({tags, value, activeTag, onTagChange, onChangeValue}) => (
    <div className="filter">
        <div className='filter-item filter-search'>
            <label>
                <input
                    type="radio"
                    value={FILTERS.SEARCH_SELECTOR}
                    name="gender"
                    checked={activeTag === FILTERS.SEARCH_SELECTOR}
                    onChange={onTagChange}
                />
            </label>
            <input
                type="text"
                value={value}
                name="value"
                onChange={onChangeValue}
                placeholder='Search'
            />
        </div>
        {tags.map(tag =>
            <div className="filter-item" key={uuidv4()}>
                <label>
                    <input
                        type="radio"
                        value={tag}
                        name="gender"
                        checked={activeTag === tag}
                        onChange={onTagChange}
                    />
                    {tag}
                </label>
            </div>
        )}
    </div>
);

Filter.propTypes = {
    tags: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    activeTag: PropTypes.string.isRequired,
    onTagChange: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
}

export default Filter;