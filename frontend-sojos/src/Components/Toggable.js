import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return{
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id={props.id} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className='toggableContent'>
        {props.children}
        <Button onClick={toggleVisibility}>{props.cancel}</Button>
      </div>
    </div>
  )
})

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggable.displayName = 'Toggable'

export default Toggable