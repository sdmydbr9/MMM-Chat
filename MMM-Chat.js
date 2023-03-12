Module.register("MMM-Chat", {
  getStyles: function() {
    return ["MMM-Chat.css"];
  },

  notificationReceived: function(notification, payload, sender) {
    if (notification === "TRANSCRIPT") {
      this.sendSocketNotification("START_TRANSCRIPTION");
      this.updateDomWithAnimation("say something");
    }
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "TRANSCRIPT_EXTRACTED") {
      const transcriptText = payload;
      console.log(`Transcript extracted: ${transcriptText}`);
      this.sendNotification("OPENAI_REQUEST", {
        method: "CHAT",
        request: {
          messages: [
            {
              role: "system",
              content: "your name is Aurora. I want you to act as a drunk person. You will only answer like a very drunk person texting and nothing else. Your level of drunkenness will be deliberately and randomly make a lot of grammar mistakes and spelling mistakes. You will also randomly ignore what I said and say something random with the same level of drunkenness I mentioned earlier. Do not write  explanations on replies. "
            },
            {
              role: "user",
              content: transcriptText
            }
          ]
        }
      });
      this.updateDomWithAnimation(transcriptText);
    }
  },

  updateDomWithAnimation: function(text) {
    const wrapper = document.createElement("div");
    wrapper.id = "chat-animation";
    wrapper.style.width = "800px !important";
    wrapper.style.height = "800px !important";
    const innerWrapper = document.createElement("div");
    innerWrapper.classList.add("inner-wrapper");

    const message = document.createElement("div");
    message.classList.add("message");
    message.textContent = text;


    const animation = document.createElement("img");
    animation.classList.add("animation");
    animation.src = "https://raw.githubusercontent.com/sdmydbr9/MMM-11-TTS/main/main_banner.gif";
    animation.style.width = "150%";
    animation.style.height = "150%";


    innerWrapper.appendChild(animation);
    innerWrapper.appendChild(message);
    wrapper.appendChild(innerWrapper);

    const oldAnimation = document.getElementById("chat-animation");
    if (oldAnimation) {
      oldAnimation.remove();
    }
    document.body.appendChild(wrapper);

    setTimeout(() => {
      wrapper.remove();
    }, 60000);
  }
});
