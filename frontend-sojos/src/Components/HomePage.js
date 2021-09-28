import React, { useEffect, useState } from 'react'
import Toggable from './Toggable'
import { useSelector } from 'react-redux'
import RSVPList from './RSVPList'
import { convertFromRaw } from 'draft-js'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import EditIcon from '@material-ui/icons/Edit'
import { dateHelper, sortByDate } from './listHelper'
import RSVP from './RSVP'

const HomePage = () => {
  const history = useHistory()
  
  const gatherings = useSelector(state => state.gatherings)
  const [ gathering, setGathering ] = useState(sortByDate(gatherings)[0])

  useEffect(() => {
    setGathering(sortByDate(gatherings)[0])
    console.log('sortByDate', sortByDate(gatherings))
  }, [gatherings])

  const [ editor, setEditor ] = useState(() =>
  EditorState.createWithContent(
    convertFromRaw(JSON.parse(gathering.content)))
  )
  
  useEffect(() =>{
    setEditor(() => EditorState.createWithContent(
      convertFromRaw(JSON.parse(gathering.content))))
  },[gathering])
  
  /********Convert date for display*************************** */
  const string = dateHelper(gathering)
  /********************************************************* */

  const rsvpValue = gathering.rsvp.filter(data => data.rsvp === 'true').length
  console.log(rsvpValue)

  return(
      <div className='gatheringContent'>
        <h2 className='gatheringTitle'>
          <div className='hcgath'>
            House Church GathEring
          </div>
          <div className='editicon'>
            <EditIcon id='editicon' onClick= {() => history.push(`/update-gatherings/${gathering.id}`)}/>
          </div>
        </h2>
        <div className='gatheringParagraph'>
          <p>
          <strong>Date:</strong> {string.date}
          </p>
          <p>
            <strong>Time:</strong> {' '}
            {
              moment(gathering.startTime, "HH:mm").format("hh:mm a")
            } - {' '}
            {
              moment(gathering.endTime, "HH:mm").format("hh:mm a")
            }
          </p>
          <div id='location'>
            <strong>Location:</strong>{' '}
            <div id='locationdata'>
              {gathering.location.street}
              <div>
                {`${gathering.location.city} ${gathering.location.state} ${gathering.location.postal}`}
              </div>
            </div>
          </div>
          <div>
            <RSVP gathering={gathering}/>
            <p>
              Attending: {rsvpValue}
            </p>
            <strong>Details for the evening:</strong> 
          </div>
            <Editor
              editorState={editor}
              onEditorStateChange={setEditor}
              readOnly={true}
              toolbarHidden={true}
            />
          <p>
          </p>
          <Toggable id='rsvp-btn' buttonLabel="Who's in?" cancel='hide'>
            <RSVPList gathering={gathering} />
          </Toggable>
          <div className='postInfo'>
            posted on {string.postDate} at {string.postTime} by {gathering.user.firstName} {gathering.user.lastName} 
          </div>
        </div>
      </div>
  )
}

export default HomePage