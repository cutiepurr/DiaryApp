import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { timestampParser } from '../timestampParser';
import { Button, Form, Input, Label } from 'reactstrap';
import { marked } from 'marked';

const DiaryEntryEditForm = () => {
    const [entry, setDiary] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetch(`api/Diary/${id}`)
            .then(result => {
                return result.json();
            })
            .then(data => {
                setDiary(data);
                document.getElementById('title').value = data.title;
                document.getElementById('createdTimestamp').value = toCADateFormat(data.createdTimestamp);
                document.getElementById('content').value = data.content;
                handleContentChange();
            })
    }, []);

    const toCADateFormat = (date) => {
        return new Date(date).toLocaleDateString('en-CA');
    };

    const submitForm = (e) => {
        e.preventDefault();
        entry.title = document.getElementById('title').value;
        entry.content = document.getElementById('content').value;
        fetch(`api/Diary/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
            .then(response => {
                console.log(response);
                if (response.ok) window.location.href = `diary/${id}`;
            })
            .catch(err => {
                console.error(err);
            })
    };

    const handleContentChange = () => {
        document.getElementById('content-preview').innerHTML = marked.parse(
            document.getElementById('content').value
        );
    }
    
    const entryView =
        <Form onSubmit={submitForm}>
            <h3>(#{id})</h3>
            <Label for='title'>Title</Label>
            <Input id='title' name='title' placeholder='Title' />
            <Label for='createdTimestamp'>Created</Label>
            <Input id='createdTimestamp' name='createdTimestamp' type='date' disabled />
            <Label for='content'>Content</Label>
            <Input id='content' name='content' placeholder='Content' 
            type='textarea' height='300' onChange={handleContentChange} />
            <div>
                <h5>Preview</h5>
                <div id='content-preview'></div>
            </div>
            <Button type='submit'>Submit</Button>
        </Form>

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

export default DiaryEntryEditForm;
