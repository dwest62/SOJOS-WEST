import moment from "moment"
/* Function takes gathering as input and returns an object which holds
  rsvp information sorting users into their families */
export const sortByFamily = (gathering) => {
  let result = []
  const gath = gathering.rsvp.filter(data => data !== null)
  for (let i = 0; i < gath.length; i++){
    if(result.find(data => data.family === gath[i].lastName)){
      const newMember = {name: gath[i].firstName, rsvp: gath[i].rsvp}
      const newGuest = {name: gath[i].firstName, family:gath[i].lastName, id:gath[i].id}
      result = result.map(data => 
        data.family === gath[i].lastName 
          ? gath[i].username !== 'guest'
            ? data = {...data, members:data.members.concat(newMember)}
            : data = {...data, guests:data.guests.concat(newGuest)}
          : data)
    } else {
      let object = {family: gath[i].lastName, members: [{name: gath[i].firstName, rsvp: gath[i].rsvp}], guests: []}
      result = result.concat(object)
    }
  }
  return(result)
}

/* Function takes gatherings as input and compares the dates to return the gathering for the next Saturday.*/

export const sortByDate = (gatherings) => {
  let gatheringsThisWeek
  gatherings 
  ? gatheringsThisWeek = gatherings.filter(
      data => moment(data.date).week() === moment().week()
    )
  : gatheringsThisWeek = null
  
  return(gatheringsThisWeek)
}

export const dateHelper = (gathering) => {
  const postDate= moment(gathering.postDate)
  const date = moment(gathering.date)
  const postDateFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const longEnUSFFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const postDateString = postDateFormat.format(postDate)
  const postTimeString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(postDate)
  const dateString = longEnUSFFormatter.format(date)
  const string = {
    postDate: postDateString,
    postTime: postTimeString,
    date: dateString
  }
  return string
}