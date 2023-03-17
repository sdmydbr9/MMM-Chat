import argparse
import os
import sounddevice as sd
import soundfile as sf
from google.cloud import speech_v1 as speech

def speech_to_text(credentials_path, audio_file_path, language_code):
    client = speech.SpeechClient.from_service_account_json(credentials_path)
    config = {
        "language_code": language_code,
        "audio_channel_count": 2,
        "enable_automatic_punctuation": True
    }
    with open(audio_file_path, "rb") as audio_file:
        content = audio_file.read()
    audio = speech.RecognitionAudio(content=content)
    response = client.recognize(config=config, audio=audio)
    print_sentences(response)

def print_sentences(response):
    for result in response.results:
        best_alternative = result.alternatives[0]
        transcript = best_alternative.transcript
        confidence = best_alternative.confidence
        print(f"{transcript}")

# set up sounddevice
CHUNK = 1024
FORMAT = 'wav'
CHANNELS = 2
RATE =48000
RECORD_SECONDS = 6
WAVE_OUTPUT_FILENAME = "output.wav"

# start recording
print("say something...")
frames = sd.rec(int(RATE * RECORD_SECONDS), samplerate=RATE, channels=CHANNELS, blocking=True)

# save recorded audio to file
sf.write(WAVE_OUTPUT_FILENAME, frames, RATE)

# transcribe saved audio file with Google Cloud Speech-to-Text API
credentials_path = "/home/pi/MagicMirror/modules/MMM-Chat/credentials.json" #path to credentials.json
language_code = "en-US"
speech_to_text(credentials_path, WAVE_OUTPUT_FILENAME, language_code)

# delete saved audio file
os.remove(WAVE_OUTPUT_FILENAME)
