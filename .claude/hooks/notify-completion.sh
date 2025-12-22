#!/bin/bash

# Claude Code Voice Notification
# This script runs when Claude Code finishes a response (Stop event)

# macOS text-to-speech
if [[ "$OSTYPE" == "darwin"* ]]; then
    say "Task completed" &
fi

exit 0
