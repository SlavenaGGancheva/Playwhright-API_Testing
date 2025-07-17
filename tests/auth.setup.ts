import { test as setup } from '@playwright/test'
import user from '../.auth/user.json'
import fs from 'fs'

const authFile = '.auth/user.json'

setup('authentication', async ({ request }) => {
  const respose = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      "user":{"email":"pwtest555@test.com","password":"Welcome123"}
    }
  })
  const responseBody = await respose.json()
  const accessToken = responseBody.user.token
  user.origins[0].localStorage[0].value = accessToken
  fs.writeFileSync(authFile, JSON.stringify(user))
    
  process.env['ACCESS_TOKEN'] = accessToken
  

})