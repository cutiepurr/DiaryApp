import React, { useState } from 'react';
import { Button, Form, Input, Label } from 'reactstrap';
import { DiaryEntryPreview } from './components/DiaryEntryPreview';

const DiaryEntryCreateForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const redirectToView = () => window.location.href = `/`

    const submitForm = (e) => {
        e.preventDefault();
        var entry = {
            title : title,
            content: content
        }
        fetch(`api/Diary`, {
            method: 'POST',
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
        setContent(document.getElementById('content-input').value);
    };

    const createForm =
        <Form onSubmit={submitForm}>
            <h1>Create new Entry</h1>
            <Label for='title-input'>Title</Label>
            <Input id='title-input' name='title-input' placeholder='Title' onChange={handleTitleChange} />
            <Label for='createdTimestamp'>Created</Label>
            <Input id='createdTimestamp' name='createdTimestamp' type='date' />
            <Label for='content-input'>Content</Label>
            <Input id='content-input' name='content-input' placeholder='Content'
                type='textarea' height='300' onChange={handleContentChange} />
            <div>
                <Button className='m-2 float-end' type='button' color='danger' onClick={redirectToView}>Cancel</Button>
                <Button className='m-2 float-end' type='submit' color='primary'>Submit</Button>
            </div>
        </Form>

    return (
        <>
            { createForm }
            <div className='mt-5'>
                <h5>Preview</h5><hr />
                <DiaryEntryPreview entry={{
                    title: title,
                    content: content
                }} />
            </div>
        </>
    );
}

export {
    DiaryEntryCreateForm
};
