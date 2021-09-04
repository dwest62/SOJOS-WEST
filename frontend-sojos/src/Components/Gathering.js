import React, { useEffect, useState } from 'react'
import gatheringService from '../services/gatherings'
import Toggable from './Toggable'

const Gathering = () => {
  const [ gathering, setGathering ] = useState([])

  useEffect(() => {
    gatheringService.getAll()
    .then(response => setGathering(response))
  },[])

  return(
    <div className='gatheringContent'>
      <h2 id='gatheringTitle'>
        House Church Gathering
      </h2>
      <p>
        <strong>Date:</strong> {gathering.date}
      </p>
      <p>
        <strong>Time:</strong> {gathering.time}
      </p>
      <p>
        <strong>Details for the evening:</strong> 
      </p>
      <p>
        {gathering.content}        
      </p>
      <div>
        <Toggable id='rsvp-btn' buttonLabel='RSVP' cancel='cancel'>
          RSVP

        </Toggable>
      </div>
    </div>
  )
}

export default Gathering