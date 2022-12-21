const PORT =  process.env.PORT || 3000;
import { app } from './app'
// require('dotenv').config()

app.listen(PORT, () => {
  console.log(`OUR ACCOUNTABILITY Server is connected through: ${PORT}`)
})
