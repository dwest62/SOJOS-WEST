import React from 'react'
import { useSelector } from 'react-redux'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const Notification = () => {
  
  const notification = useSelector(state => state.user).notification

  if (notification===null){
    return null
  } else {
    return (
      <div className="notif-wrap">
        <div>
          <ErrorOutlineIcon color='error'/>
        </div>
        <div>
          {notification}
        </div>
      </div>
    )
  }
}

export default Notification