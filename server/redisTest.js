const express = require('express')
const PORT = 5001
const app = express()
const router = express.Router()
const redis = require('redis')
const { createClient } = require('redis')

app.use(express.json())

// const redisClient = createClient(6379, '127.0.0.1')
const redisClient = createClient()
const client = redis.createClient({
  host: 'redis-server',
  port: 6379,
})
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Sample Docker Redis Application',
  })
})
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

async function main() {
  const key = 'cat'
  try {
    await redisClient.set(key, 'Bongo')
    const result = await redisClient.get(key)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
  redisClient.disconnect()
}

// Used as a diagnostic tool
redisClient.connect(() => console.log('Connected to Redis server'))

main()
