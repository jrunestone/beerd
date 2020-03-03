exports.handler = (event, context, callback) => {
    console.log('event', event);
    console.log('context', context);

    return callback(null, {
        statusCode: 200,

        body: JSON.stringify({
            data: '⊂◉‿◉つ'
        })
    });
}