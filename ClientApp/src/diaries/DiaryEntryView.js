import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { DiaryEntryPreview } from './components/DiaryEntryPreview';
import { Button } from 'reactstrap';
import { Editor } from '@toast-ui/editor';
import { timestampParser } from '../timestampParser';

const DiaryEntryPage = () => {
    const [entry, setEntry] = useState({});
    const { id } = useParams();
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        fetch(`api/Diary/${id}`)
            .then(result => {
                return result.json();
            })
            .then(data => {
                setEntry(data);
                setEditor(Editor.factory({
                    el: document.getElementById('content'),
                    viewer: true,
                    initialValue: data.content,
                }));
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
            <div>
                <h1>{entry.title} {entry.id != null && <span>(#{entry.id})</span>}</h1>
                <div>{entry.createdTimestamp != null && timestampParser(entry.createdTimestamp)}</div>
            </div>
            <hr />
            <div id='content'></div>
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
