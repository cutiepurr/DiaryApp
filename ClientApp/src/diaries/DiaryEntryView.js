import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { DiaryPreview } from './components/DiaryPreview';

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

    return (
        <div>
            <div>
                <a className='btn btn-primary float-end' href={`diary/${entry.id}/edit`}>Edit</a>
            </div>
            <DiaryPreview entry={entry} />
        </div>
    );
}

export {
    DiaryEntryPage,
};
