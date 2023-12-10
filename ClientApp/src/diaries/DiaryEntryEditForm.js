import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { timestampParser } from '../timestampParser';
import { Button, Form, Input, Label } from 'reactstrap';
import { marked } from 'marked';
import { DiaryPreview } from './components/DiaryPreview';

const DiaryEntryEditForm = () => {
    const [entry, setEntry] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { id } = useParams();
    
    useEffect(() => {
        fetch(`api/Diary/${id}`)
            .then(result => {
                return result.json();
            })
            .then(data => {
                setEntry(data);
                document.getElementById('title-input').value = data.title;
                document.getElementById('createdTimestamp').value = new Date(data.createdTimestamp).toLocaleDateString('en-CA');
                document.getElementById('content-input').value = data.content;
                handleTitleChange();
                handleContentChange();
            })
    }, []);

    const redirectToView = () => window.location.href = `diary/${id}`

    const submitForm = (e) => {
        e.preventDefault();
        entry.title = document.getElementById('title-input').value;
        entry.content = document.getElementById('content-input').value;
        fetch(`api/Diary/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
            .then(response => {
                console.log(response);
                if (response.ok) redirectToView();
            })
            .catch(err => {
                console.error(err);
            })
    };

    const handleTitleChange = () => {
        setTitle(document.getElementById('title-input').value);
    };

    const handleContentChange = () => {
        setContent(document.getElementById('content-input').value)
    };

    const entryView =
        <Form onSubmit={submitForm}>
            <h3>(#{id})</h3>
            <Label for='title-input'>Title</Label>
            <Input id='title-input' name='title-input' placeholder='Title' onChange={handleTitleChange} />
            <Label for='createdTimestamp'>Created</Label>
            <Input id='createdTimestamp' name='createdTimestamp' type='date' disabled />
            <Label for='content-input'>Content</Label>
            <Input id='content-input' name='content-input' placeholder='Content'
                type='textarea' height='300' onChange={handleContentChange} />
            <div>
                <Button className='m-2' type='submit'>Submit</Button>
                <Button className='m-2' type='button' onClick={redirectToView}>Cancel</Button>
            </div>
        </Form>

    return (
        <div>
            {
                entry != null
                    ? entryView
                    : <h3>Loading...</h3>
            }
            <div className='mt-5'>
                <h5>Preview</h5><hr />
                <DiaryPreview entry={{
                    id: id,
                    title: title,
                    content: content,
                    createdTimestamp: entry.createdTimestamp
                }} />
            </div>
        </div>
    );
}

export {
    DiaryEntryEditForm
};
