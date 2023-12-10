import React from 'react';
import { marked } from 'marked';
import { timestampParser } from '../../timestampParser';

const DiaryPreview = ({entry}) => {
    const preview =
        <div>
            <div>
                <h1>{entry.title} {entry.id != null && <span>(#{entry.id})</span>}</h1>
                <div>{entry.createdTimestamp != null && timestampParser(entry.createdTimestamp)}</div>
            </div>
            <hr />

            <div dangerouslySetInnerHTML={
                { __html: entry.content != null ? marked.parse(entry.content) : "" }
            }></div>
        </div>

    return (
        <div>
            {
                entry != null
                    ? preview
                    : <h3>Loading...</h3>
            }
        </div>
    );
}

export {
    DiaryPreview
};
