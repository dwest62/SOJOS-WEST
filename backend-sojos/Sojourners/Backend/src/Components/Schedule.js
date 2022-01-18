import { Button } from '@material-ui/core'
import React from 'react'

const Schedule = () => {

  const handleViewOnClick = () => {
    console.log('click')
    window.open("https://docs.google.com/spreadsheets/d/1OSqUbgg77Mg1vFJDdVS_ZnpVg3kig__imE8qbvDVSp0/edit#gid=0",'_blank').focus()
  }
  return(
    <div>
      <h2 className="schedule-header">
        Schedule
      </h2>
      <div className="schedule-header" id="schbtnwrap">
          <Button id='schbtn' onClick={handleViewOnClick}>
            View/Edit
          </Button>
      </div>
      <div className='docsWrapper'>
       <iframe className="docs" title='Schedule' 
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTnsLaw_VktboAd7px2O6ctICoSxTjzYiZtL_0JJtNVO0Zz1tPw7OCiHWfRvYawsOVQjI_8E6b30sJ6/pubhtml?gid=0&single=true&widget=false&chrome=false&" >
       </iframe>
      </div>
    </div>
   )
}

export default Schedule