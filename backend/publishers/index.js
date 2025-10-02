const emitter = require("../events")

module.exports = (io) => {
  emitter.on("resumeCreated", (resume) => {
    console.log("Resume created: ", resume._id)
    io.emit("resumeCreated", {message: "A new resume has been created", resume})
  })
}
