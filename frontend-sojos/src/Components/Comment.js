import React from 'react'
import moment from 'moment'

const Comment = ({gathering}) => {

  if(gathering.comments){
    const comments = gathering.comments
    console.log(moment(gathering.comments[0].postDate), 'date')
    return (
      <div>
        <h3>Comments</h3>
        <div className='commentsOuterWrapper'>
          {comments.map(data =>
            <div className='commentsWrapper'>
              <div className='commentsData'>
                {data.comment}
              </div>
              <cite className="cite">
                {data.firstName} {data.lastName} {" "}
                {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day:'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  }).format(moment(data.postDate))}
              </cite>
            </div>
          )}
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Comment