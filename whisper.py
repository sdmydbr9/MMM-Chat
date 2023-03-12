import sounddevice as sd
import soundfile as sf
import os
import openai

# set up OpenAI API credentials
openai.api_key = "api-key" #openai api key

# set up sounddevice
CHUNK = 1024
FORMAT = 'wav'
CHANNELS = 2
RATE =48000
RECORD_SECONDS = 5
WAVE_OUTPUT_FILENAME = "output.wav"

# start recording
frames = sd.rec(int(RATE * RECORD_SECONDS), samplerate=RATE, channels=CHANNELS, blocking=True)

# save recorded audio to file
sf.write(WAVE_OUTPUT_FILENAME, frames, RATE)

# read saved audio file and transcribe with OpenAI
with open(WAVE_OUTPUT_FILENAME, "rb") as f:
    transcript = openai.Audio.transcribe("whisper-1", f, filetype='wav')

# delete saved audio file
#os.remove(WAVE_OUTPUT_FILENAME)

print(transcript['text'])
