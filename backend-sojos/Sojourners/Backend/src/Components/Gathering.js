import React, { useState } from "react"
import { convertFromRaw, EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import moment from 'moment'
import Toggable from "./Toggable"
import { dateHelper } from "./listHelper"


const Gathering = ({gathering}) => {

  const [ content, setContent ] = useState(() =>
    EditorState.createWithContent(
      convertFromRaw(JSON.parse(gathering.content))
    ))


  /********Convert date for display*************************** */
  const string = dateHelper(gathering)
  /********************************************************* */

  if (gathering){
    return(
      <div className='gatheringContent' id='archivedContent'>
        <div className='gatheringParagraph' id='archTitle'>
            <strong>Gathering for {string.date}</strong>
        </div>
        <Toggable id='arch-btn' buttonLabel="show" cancel='hide'>
          <div className='gatheringParagraph'>
          <p>
              <strong>Time:</strong> {' '}
              {
                moment(gathering.startTime, "HH:mm").format("hh:mm a")
              } - {' '}
              {
                moment(gathering.endTime, "HH:mm").format("hh:mm a")
              }
            </p>
            <div>
              <strong>Location:</strong>{' '}
              <p>
                {gathering.location.street}{', '}
                {gathering.location.city}{' '}
                {gathering.location.state}{' '}
                {gathering.location.postal}
              </p>
            </div>
            <strong>Details for the Evening</strong>
            <Editor
                editorState={content}
                onEditorStateChange={setContent}
                readOnly={true}
                toolbarHidden={true}
              />
            </div>
          <div className='postInfo'>
            posted on {string.postDate} at {string.postTime} by {gathering.user.firstName} {gathering.user.lastName} 
          </div>
        </Toggable>
      </div>
    )
  } else {
    return null
  }
}

export default Gathering