import React, { useState, useEffect } from 'react';
import { timestampParser } from '../timestampParser';
import { Button, Card, CardBody, CardTitle } from 'reactstrap'

const Diary = () => {
    const [diary, setDiary] = useState([]);
    useEffect(() => {
        fetch(`api/Diary`)
            .then(result => {
                return result.json();
            })
            .then(data => {
                setDiary(data)
            })
    }, []);

    const diaryIndex = diary.map(entry =>
        <Card key={entry.id} className='mt-3'>
            <CardBody className='row'>
                <CardTitle tag='h5' className='col col-sm-9'>{entry.title} (#{entry.id})</CardTitle>
                <div className='col col-sm-3 text-end'>{timestampParser(entry.createdTimestamp)}</div>
                <a className='stretched-link' href={`diary/${entry.id}`}></a>
            </CardBody>
        </Card>
    );

    return (
        <>
            <Button type='button' color='primary' onClick={() => {window.location.href='/diary/new'}}>New</Button>
            {
                diary != null
                    ? diaryIndex
                    : <h3>Loading...</h3>
            }
        </>
    );
}

export default Diary;
