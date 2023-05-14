import { url } from "../App";

const refreshToken = async( user, setUser ) => {

  const res = await fetch(`${url}refresh-token`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.refreshToken}`
    }
  })
  const data = await res.json();
  console.log(data);
  if(data.message === 'ok') {
    localStorage.removeItem('userCurrent');
    localStorage.setItem('userCurrent', JSON.stringify(data));
    setUser(data);
  }
}

export default refreshToken;