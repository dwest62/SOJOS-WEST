import React from 'react'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { addComment} from '../reducers/gatheringReducer'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

const AddComment = ({gathering}) => {


  const dispatch = useDispatch()
  const user = useSelector(state => state.user).user

  const handleAddComment = (event) => {
    event.preventDefault()
    const postDate = moment(new Date())
    const obj = {
      id:uuidv4(),
      postDate: postDate,
      firstName: user.firstName,
      lastName: user.lastName,
      comment: event.target.comment.value
    }
    event.target.comment.value=''
    dispatch(addComment(gathering, obj))
  }

  return (
    <div>
      <strong>Add Comment:</strong>
      <form onSubmit={handleAddComment} id='addComment'>
        <div className='input-wrapper3'id='comment-input-wrapper'>
          <input 
            className='input-box2'
            name='comment'
            placeholder='Add comment here...'
            id='comment-input-box'
          />
        </div>
        <Button type='submit'>submit</Button>
      </form>
    </div>
  )
}

export default AddComment