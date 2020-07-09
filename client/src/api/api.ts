import handleError from './error'

export function login(username: string, password: string) {
  return fetch('http://localhost:5000/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleError)
}


export function signUp(username: string, password: string) {
  return fetch('http://localhost:5000/signup', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleError)
}

export function logOut() {
  return fetch('http://localhost:5000/logout', {
    credentials: 'include'
  })
}

export function test() {
  return fetch('http://localhost:5000/testuser', {
    credentials: 'include'
  }).then(handleError);
}

export function getUser() {
  return fetch('http://localhost:5000/user', {
    credentials: 'include'
  }).then(handleError);
}
