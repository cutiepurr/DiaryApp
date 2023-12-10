import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Label } from 'reactstrap';
import { Editor } from '@toast-ui/editor';

const DiaryEntryCreateForm = () => {
    const [countEntry, setCountEntry] = useState(0);
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        fetch(`api/Diary/count`)
        .then(response => response.json())
        .then(data =>{ 
            console.log(data);
            setCountEntry(data)
        });
        document.getElementById('createdTimestamp').valueAsDate = new Date();
        setEditor(new Editor({
            el: document.getElementById('content-input'),
            initialEditType: 'markdown',
            previewStyle: 'vertical'
        }));
    }, []);

    const redirectToView = () => window.location.href = `/`

    const submitForm = (e) => {
        e.preventDefault();
        var entry = {
            id: countEntry+1,
            title : document.getElementById('title-input').value,
            content: editor.getMarkdown()
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

    const createForm =
        <Form onSubmit={submitForm}>
            <h1>Create new Entry</h1>
            <Label for='title-input'>Title</Label>
            <Input id='title-input' name='title-input' placeholder='Title'/>
            <Label for='createdTimestamp'>Created</Label>
            <Input id='createdTimestamp' name='createdTimestamp' type='date' />
            <Label for='content-input'>Content</Label>
            <div id='content-input'></div>
            <div>
                <Button className='m-2 float-end' type='button' color='danger' onClick={redirectToView}>Cancel</Button>
                <Button className='m-2 float-end' type='submit' color='primary'>Submit</Button>
            </div>
        </Form>

    return (
        <>
            { createForm }
        </>
    );
}

export {
    DiaryEntryCreateForm
};
