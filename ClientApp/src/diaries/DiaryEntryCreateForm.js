import React, { useState } from 'react';
import { Button, Form, Input, Label } from 'reactstrap';
import { marked } from 'marked';

const DiaryEntryCreateForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [previewContent, setPreviewContent] = useState("");

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
        let contentElement = document.getElementById('content-input');
        if (contentElement == null || contentElement.value == null) return;
        setContent(contentElement.value);
        setPreviewContent(marked.parse(contentElement.value));
    };

    const entryView =
        <Form onSubmit={submitForm}>
            <Label for='title-input'>Title</Label>
            <Input id='title-input' name='title-input' placeholder='Title' onChange={handleTitleChange} />
            <Label for='content-input'>Content</Label>
            <Input id='content-input' name='content-input' placeholder='Content'
                type='textarea' height='300' onChange={handleContentChange} />
            <div>
                <Button className='m-2' type='submit'>Submit</Button>
                <Button className='m-2' type='button' onClick={redirectToView}>Cancel</Button>
            </div>
        </Form>

    const preview =
        <div>
            <div className='row'>
                <div className='col col-sm-9'>
                    <h3>{title}</h3>
                </div>
            </div>
            <hr />

            <div dangerouslySetInnerHTML={{ __html: previewContent }}></div>
        </div>

    return (
        <div>
            { entryView }
            <div className='mt-5'>
                <h5>Preview</h5><hr />
                { preview }
            </div>
        </div>
    );
}

export {
    DiaryEntryCreateForm
};
