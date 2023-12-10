const timestampParser = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-UK', {
        dateStyle: 'medium'
    });
}

export {
    timestampParser
};