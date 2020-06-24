import handleError from './error'

export default async function login(username: string, password: string) {
  return fetch('localhost:5000/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(handleError)
}
