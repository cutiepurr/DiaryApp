import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { timestampParser } from '../timestampParser';
import { Button, Form, Input, Label } from 'reactstrap';
import { marked } from 'marked';

const DiaryEntryEditForm = () => {
    const [entry, setEntry] = useState({});
    const [previewTitle, setPreviewTitle] = useState("");
    const [previewContent, setPreviewContent] = useState("");
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
        setPreviewTitle(document.getElementById('title-input').value);
    };

    const handleContentChange = () => {
        let content = document.getElementById('content-input');
        if (content == null || content.value == null) return;
        setPreviewContent(marked.parse(content.value));
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

    const preview =
        <div>
            <div className='row'>
                <div className='col col-sm-9'>
                    <h3>{previewTitle} (#{entry.id})</h3>
                    <div>{timestampParser(entry.createdTimestamp)}</div>
                </div>
            </div>
            <hr />

            <div dangerouslySetInnerHTML={{ __html: previewContent }}></div>
        </div>

    return (
        <div>
            {
                entry != null
                    ? entryView
                    : <h3>Loading...</h3>
            }
            <div className='mt-5'>
                <h5>Preview</h5><hr />
                {
                    entry != null
                        ? preview
                        : <h3>Loading...</h3>
                }
            </div>
        </div>
    );
}

export {
    DiaryEntryEditForm
};
