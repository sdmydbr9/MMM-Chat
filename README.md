# MMM-Chat
Magicmirror module to chat with chat gpt 

This module assumes that your default installation location is /home/pi/MagicMirror. 


Installation instruction 


1. git clone https://github.com/sdmydbr9/MMM-Chat.git
2. cd MMM-Chat
3. pip3 install -r requirements.txt

Add the credentials to the MMM-Chat directory

## I have provided another script to use with the whisper api, but while testing didnt really provide as much accuracy as the google STT. Feel free to use the whisper.py with little modification to the MMM-Chat.js


You will need  google service account credentials and a billing account, go through the pricing, they offer a free quota and if you stay within that you will not be charged


1. Go to the Google Cloud Console. ([https://console.cloud.google.com/])
2. Create a new project or select an existing project.
3. Navigate to the APIs & Services > Credentials page.
4. Click Create credentials and select Service account key.
5. Choose a service account name and select the Editor role.
6. Go to the service account and click on add key.
7. Select JSON as the key type and click Create.
8. The JSON key file will be downloaded to your computer. Note the file path and name, as you will need to specify this in your Python code transcript.py.
9. Or you can just rename it to credentials.json and place the credentials to the MMM-Chat directory.



just add the following lines to your config 


            {
        module: "MMM-Chat",
        config: {}
        },
