import React, { useState, useEffect } from 'react';
import { timestampParser } from '../timestampParser';
import { Button, Card, CardBody, CardTitle, Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const Diary = () => {
    const [diary, setDiary] = useState([]);
    const [countPagination, setCountPagination] = useState(0);
    const [startPagination, setStartPagination] = useState(0);
    const countPerPagination = 1;

    useEffect(() => {
        fetch(`api/Diary/count`)
            .then(result => result.json())
            .then(data => {
                setCountPagination(Math.ceil(data / countPerPagination));
            });
    }, []);

    useEffect(() => {
        fetch(`api/Diary?start=${startPagination}&count=${countPerPagination}`)
            .then(result => result.json())
            .then(data => {
                setDiary(data);
            });
    }, [startPagination]);

    const diaryIndex = diary.map(entry =>
        <Card key={entry.id} className='mt-3 entry-card'>
            <CardBody className='row'>
                <CardTitle tag='h5' className='col col-sm-9'>{entry.title} (#{entry.id})</CardTitle>
                <div className='col col-sm-3 text-end'>{timestampParser(entry.createdTimestamp)}</div>
                <a className='stretched-link' href={`diary/${entry.id}`}></a>
            </CardBody>
        </Card>
    );

    const paginationItems = Array.from({ length: countPagination }, (_, i) =>
        <PaginationItem key={i}>
            <PaginationLink onClick={() => setStartPagination(i)}>
                {i + 1}
            </PaginationLink>
        </PaginationItem>
    );

    return (
        <>
            <Button type='button' color='primary' onClick={() => { window.location.href = '/diary/new' }}>New</Button>
            {
                diary != null
                    ? diaryIndex
                    : <h3>Loading...</h3>
            }
            <Pagination>
                {paginationItems}
            </Pagination>
        </>
    );
}

export default Diary;
