import React, { useState, useEffect } from 'react';
import { timestampParser } from '../timestampParser';

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
        <div class='row'>
            <h4 class='col col-6'>{entry.title} (#{entry.id})</h4>
            <div class='col col-6 text-end'>{timestampParser(entry.createdTimestamp)}</div>
        </div>
    );

    return (
        <div>
            {
                diary != null
                    ? diaryIndex
                    : <h3>Loading...</h3>
            }
        </div>
    );
}

export default Diary;
