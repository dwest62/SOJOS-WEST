
/* Function takes gathering as input and returns an object which holds
  rsvp information sorting users into their families */
export const sortByFamily = (gathering) =>{
  let result = []
  const gath = gathering.rsvp.filter(data => data !== null)
  for (let i = 0; i < gath.length; i++){
    if(result.find(data => data.family === gath[i].lastName)){
      const newMember = {name: gath[i].firstName, rsvp: gath[i].rsvp}
      const newGuest = {name: gath[i].firstName, family:gath[i].lastName}
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
  console.log(result, 'WOWOWO')
  return(result)
}