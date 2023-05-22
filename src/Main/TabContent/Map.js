function Map({data, handleDelete}) {

    return (
        <>
            <div className='container-information'>
                {data.map(({title, points, author, num_comments, url, objectID}) => (
                    <div key={objectID} className='information'>
                        <h2>{title}</h2>
                        <p>{points} points by {author} | {num_comments} comments</p>
                        <a href={url} className='href'>link</a>
                        <a className='href' href='#' onClick={
                            (e) => {
                                e.preventDefault()
                                handleDelete(objectID)
                            }}>remove</a>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Map;