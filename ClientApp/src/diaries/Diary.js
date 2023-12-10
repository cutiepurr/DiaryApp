import React, { useState, useEffect } from 'react';

const Diary = () => {
    const [diary, setDiary] = useState([]);
    useEffect(() => {
        fetch(`api/Diary`)
            .then(result => {
                console.log(result);
                return result.json();
            })
            .then(data => {
                setDiary(data)
            })
    }, []);

    return (
        <div>
            {
                diary != null
                ? diary.map(item => <h3>{item.title}</h3>)
                : <h3>Loading...</h3>
            }
        </div>
    );
}

export default Diary;
