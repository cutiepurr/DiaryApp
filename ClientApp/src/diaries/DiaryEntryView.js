import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { timestampParser } from '../timestampParser';
import { marked } from 'marked';

const DiaryEntryPage = () => {
    const [entry, setEntry] = useState({});
    const { id } = useParams();
    
    useEffect(() => {
        fetch(`api/Diary/${id}`)
            .then(result => {
                return result.json();
            })
            .then(data => {
                data.content = data.content != null ? marked.parse(data.content) : "";
                setEntry(data);
            })
    }, []);

    const entryView =
        <div>
            <div className='row'>
                <div className='col col-sm-9'>
                    <h3>{entry.title} (#{entry.id})</h3>
                    <div>{timestampParser(entry.createdTimestamp)}</div>
                </div>
                <div className='col col-sm-3'>
                    <a className='btn btn-primary float-end' href={`diary/${entry.id}/edit`}>Edit</a>
                </div>
            </div>
            <hr />

            <div dangerouslySetInnerHTML={{ __html: entry.content }}></div>
        </div>

    return (
        <div>
            {entry != null
                ? entryView
                : <h3>Loading...</h3>}
        </div>
    );
}

export {
    DiaryEntryPage,
};
