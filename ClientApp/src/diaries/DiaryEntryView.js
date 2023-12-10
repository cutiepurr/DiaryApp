import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { timestampParser } from '../timestampParser';
import { Button } from 'reactstrap';

const DiaryEntryView = () => {
    const [entry, setDiary] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetch(`api/Diary/${id}`)
            .then(result => {
                return result.json();
            })
            .then(data => {
                setDiary(data)
            })
    }, []);

    const entryView =
        <div>
            <h3>{entry.title} (#{id})</h3>
            <div>{timestampParser(entry.createdTimestamp)}</div>
            <a className='btn btn-primary' href={`diary/${id}/edit`}>Edit</a>
            <div>{entry.content}</div>
        </div>

    return (
        <div>
            {
                entry != null
                    ? entryView
                    : <h3>Loading...</h3>
            }
        </div>
    );
}

export default DiaryEntryView;
