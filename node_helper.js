const NodeHelper = require("node_helper");
const { spawn } = require("child_process");

module.exports = NodeHelper.create({

  start: function() {
    this.process = null;
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "START_TRANSCRIPTION") {
      this.spawnProcess();
    }
  },

  spawnProcess: function() {
    if (this.process !== null) {
      this.process.kill();
    }
    console.log("say something");
    this.process = spawn("python3", ["/home/pi/MagicMirror/modules/MMM-Chat/transcript.py"]);

    let dataString = "";
    this.process.stdout.on("data", data => {
      dataString += data.toString();
    });
    this.process.stderr.on("data", data => {
      console.error(`stderr: ${data}`);
    });
    this.process.on("close", code => {
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        try {
          const transcriptText = dataString.trim();
          console.log(`Transcript extracted: ${transcriptText}`);
          this.sendSocketNotification("TRANSCRIPT_EXTRACTED", transcriptText);
          console.log("Sent TRANSCRIPT_EXTRACTED notification");
          this.sendSocketNotification("OPENAI_REQUEST");
          console.log("Sent OPENAI_REQUEST notification");
        } catch (error) {
          console.error(`Error parsing JSON: ${error}`);
        }
      } else {
        console.error(`child process exited with code ${code}`);
      }
    });
  },
});
