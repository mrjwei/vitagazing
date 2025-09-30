const express = require("express")
require("dotenv").config()
const cors = require("cors")

const DBConnection = require("./config/db")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/resumes", require("./routes/resumeRoutes"))
app.use("/api/cover-letters", require("./routes/coverLetterRoutes"))
app.use("/api/subscribe", require("./routes/subscriptionRoutes"))

// Export the app object for testing
if (require.main === module) {
  DBConnection.connect()
  // If the file is run directly, start the server
  const PORT = process.env.PORT || 5001
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

module.exports = app
