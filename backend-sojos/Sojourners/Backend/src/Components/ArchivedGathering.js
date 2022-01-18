import React from 'react'
import { useSelector } from 'react-redux'
import Gathering from './Gathering'

const ArchivedGatherings = () => {
  const gatherings = useSelector(state => state.gatherings)

  return(
    gatherings.map(data => 
        <Gathering key={data.id} gathering={data}/>
    )
  )
}

export default ArchivedGatherings