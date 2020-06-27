import handleError from './error'

export async function login(username: string, password: string) {
  return fetch('http://localhost:5000/login', {
    method: 'POST',
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
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(handleError)
  }