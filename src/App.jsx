import React, {useEffect, useState} from 'react';
import './App.scss';
import {fetchAll, fetchByTags, fetchByValue} from "./api/server";
import {FILTERS} from "./constants/constants";
import Filter from "./components/Filter";
import List from "./components/List";


function App() {
    const [list, setList] = useState([]);
    const [tags, setTags] = useState([]);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [activeTag, setActiveTag] = useState(FILTERS.ALL_SELECTOR);

    useEffect(() => {
        setIsLoading(true);
        fetchAll()
            .then((data = []) => {
                setList([...data]);

                let tags = data.reduce((acc, {tags}) => [...acc, ...(tags || [])], []);
                tags = [...new Set(tags)];
                setTags([FILTERS.ALL_SELECTOR, ...tags]);
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (activeTag !== FILTERS.SEARCH_SELECTOR) {
            const fetchFunction = activeTag === FILTERS.ALL_SELECTOR
                ? fetchAll
                : () => fetchByTags(activeTag);

            setIsLoading(true);
            fetchFunction()
                .then(data => setList([...data]))
                .catch(error => console.log(error))
                .finally(() => setIsLoading(false));
        }
    }, [activeTag]);

    useEffect(() => {
        if (!!value) {
            setIsLoading(true);
            setActiveTag(FILTERS.SEARCH_SELECTOR);
            fetchByValue(value)
                .then(data => setList([...data]))
                .catch(error => console.log(error))
                .finally(() => setIsLoading(false));
        } else {
            setActiveTag(FILTERS.ALL_SELECTOR);
        }
    }, [value]);

    const onTagChange = event => setActiveTag(event.target.value);
    const onChangeValue = event => setValue(event.target.value);

    return (
        <section className="app">
            <h1 className="app-title">SDKs</h1>
            <div className="container">
                <Filter
                    tags={tags}
                    value={value}
                    activeTag={activeTag}
                    onTagChange={onTagChange}
                    onChangeValue={onChangeValue}
                />
                <List list={list} isLoading={isLoading}/>
            </div>
        </section>
    )
}

export default App;
