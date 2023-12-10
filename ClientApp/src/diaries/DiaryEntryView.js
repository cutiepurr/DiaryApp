import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { DiaryEntryPreview } from './components/DiaryEntryPreview';
import { Button } from 'reactstrap';

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

    const deleteEntry = () => {
        fetch(`api/Diary/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) window.location.href='/';
        })
    }

    return (
        <>
            <div>
                <a className='btn btn-primary float-end m-2' href={`diary/${entry.id}/edit`}>Edit</a>
            </div>
            <DiaryEntryPreview entry={entry} />
            <div>
                <a className='btn btn-primary float-end m-2' href={`diary/${entry.id}/edit`}>Edit</a>
                <Button className='float-end m-2' color='danger' onClick={deleteEntry}>Delete</Button>
            </div>
            
        </>
    );
}

export {
    DiaryEntryPage,
};
