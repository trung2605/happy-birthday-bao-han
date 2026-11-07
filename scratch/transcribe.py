import os
import sys
import whisper

model = whisper.load_model('base')
result = model.transcribe(r'public\audio\New Recording 30.m4a', language='vi', fp16=False)

with open('transcript_voice_30.txt', 'w', encoding='utf-8') as f:
    f.write(result['text'])

with open('transcript_voice_30_segments.txt', 'w', encoding='utf-8') as f:
    for s in result.get('segments', []):
        f.write(f"[{s['start']:.1f}s - {s['end']:.1f}s] {s['text']}\n")

print("Done! Transcribed successfully.")
