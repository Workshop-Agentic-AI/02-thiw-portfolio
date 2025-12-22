#!/usr/bin/env python3
"""
Claude Code Thai Voice Notification Hook
Speaks task completion details in natural Thai voice using edge-tts
"""

import json
import sys
import os
import subprocess
import tempfile
from collections import Counter
from pathlib import Path

# Thai translations for tool names
TOOL_NAMES_TH = {
    "Edit": "แก้ไขไฟล์",
    "Write": "เขียนไฟล์",
    "Read": "อ่านไฟล์",
    "Bash": "รันคำสั่ง",
    "Grep": "ค้นหาในโค้ด",
    "Glob": "ค้นหาไฟล์",
    "Task": "สั่งงานเอเจนต์",
    "WebSearch": "ค้นหาเว็บ",
    "WebFetch": "ดึงข้อมูลเว็บ",
    "TodoWrite": "อัพเดทรายการงาน",
    "LSP": "วิเคราะห์โค้ด",
    "NotebookEdit": "แก้ไขโน้ตบุ๊ค",
}

# Unit words for different tools
TOOL_UNITS = {
    "Edit": "ไฟล์",
    "Write": "ไฟล์",
    "Read": "ไฟล์",
    "Bash": "คำสั่ง",
    "Grep": "ครั้ง",
    "Glob": "ครั้ง",
    "Task": "งาน",
    "WebSearch": "ครั้ง",
    "WebFetch": "หน้า",
    "TodoWrite": "ครั้ง",
    "LSP": "ครั้ง",
    "NotebookEdit": "เซลล์",
}

# Voice settings
VOICE = "th-TH-PremwadeeNeural"  # Natural Thai female voice
VOICE_RATE = "+10%"  # Slightly faster


def parse_transcript(transcript_path: str) -> list[str]:
    """Parse transcript JSONL file and extract tool names used."""
    tools_used = []

    try:
        with open(transcript_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    entry = json.loads(line)
                    if entry.get('type') == 'tool_use':
                        tool_name = entry.get('name', '')
                        if tool_name:
                            tools_used.append(tool_name)
                except json.JSONDecodeError:
                    continue
    except (FileNotFoundError, PermissionError):
        pass

    return tools_used


def generate_thai_message(tools_used: list[str]) -> str:
    """Generate Thai summary message from tools used."""
    if not tools_used:
        return "เสร็จแล้วค่ะ"

    counts = Counter(tools_used)
    parts = []

    # Priority order for mentioning tools
    priority_tools = ["Edit", "Write", "Bash", "Read", "Grep", "Glob", "Task", "WebSearch", "WebFetch"]

    for tool in priority_tools:
        count = counts.get(tool, 0)
        if count > 0:
            thai_name = TOOL_NAMES_TH.get(tool, tool)
            unit = TOOL_UNITS.get(tool, "ครั้ง")
            parts.append(f"{thai_name} {count} {unit}")

    # Add any remaining tools not in priority list
    for tool, count in counts.items():
        if tool not in priority_tools and count > 0:
            thai_name = TOOL_NAMES_TH.get(tool, tool)
            unit = TOOL_UNITS.get(tool, "ครั้ง")
            parts.append(f"{thai_name} {count} {unit}")

    if not parts:
        return "เสร็จแล้วค่ะ"

    # Limit to top 3 most relevant actions
    parts = parts[:3]

    if len(parts) == 1:
        return f"เสร็จแล้วค่ะ {parts[0]}"
    elif len(parts) == 2:
        return f"เสร็จแล้วค่ะ {parts[0]}และ{parts[1]}"
    else:
        return f"เสร็จแล้วค่ะ {parts[0]} {parts[1]}และ{parts[2]}"


def speak_thai(text: str) -> bool:
    """Generate and play Thai speech using edge-tts."""
    try:
        with tempfile.NamedTemporaryFile(suffix='.mp3', delete=False) as tmp:
            tmp_path = tmp.name

        # Generate audio with edge-tts
        result = subprocess.run(
            [
                sys.executable, '-m', 'edge_tts',
                '--voice', VOICE,
                '--rate', VOICE_RATE,
                '--text', text,
                '--write-media', tmp_path
            ],
            capture_output=True,
            timeout=10
        )

        if result.returncode != 0:
            return False

        # Play audio with afplay (macOS)
        subprocess.run(
            ['afplay', tmp_path],
            capture_output=True,
            timeout=15
        )

        # Cleanup
        try:
            os.unlink(tmp_path)
        except:
            pass

        return True

    except Exception:
        return False


def fallback_speak(text: str = "Task completed"):
    """Fallback to macOS say command for English."""
    try:
        subprocess.run(['say', text], capture_output=True, timeout=5)
    except:
        pass


def main():
    # Read hook input from stdin
    try:
        hook_input = json.load(sys.stdin)
    except (json.JSONDecodeError, EOFError):
        hook_input = {}

    # Extract transcript path
    transcript_path = hook_input.get('transcript_path', '')

    # Parse transcript and get tools used
    tools_used = []
    if transcript_path and os.path.exists(transcript_path):
        tools_used = parse_transcript(transcript_path)

    # Generate Thai message
    message = generate_thai_message(tools_used)

    # Speak the message
    if not speak_thai(message):
        # Fallback to English if Thai TTS fails
        fallback_speak()

    return 0


if __name__ == '__main__':
    sys.exit(main())
