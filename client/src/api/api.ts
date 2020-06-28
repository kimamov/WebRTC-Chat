import handleError from './error'

export async function login(username: string, password: string) {
  return fetch('http://localhost:5000/login', {
    method: 'POST',
    credentials:'include',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleError)
}


export async function signUp(username: string, password: string) {
    return fetch('http://localhost:5000/signup', {
      method: 'POST',
      credentials:'include',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(handleError)
  }

export async function logOut(){
  return fetch('http://localhost:5000/logout', {
    credentials: 'include'
  })
}