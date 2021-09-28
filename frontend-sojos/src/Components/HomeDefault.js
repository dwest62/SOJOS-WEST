import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router'

const HomeDefault = () =>{
  const history=useHistory()
  return(
    <div className='gatheringContent'>
      <h2 className='gatheringTitle'>
      <div className='hcgath2'>
        House Church Gathering
      </div>
      </h2>
        <Button id='post-btn' onClick={() => history.push('/new-gathering')}>
          Post Gathering
        </Button>
      <p className="gatheringParagraph2">
        Awaiting post from core... Stay tuned.
      </p>
    </div>
  )
}

export default HomeDefault