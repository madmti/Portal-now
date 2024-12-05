#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
if [[ "$VERCEL_GIT_COMMIT_REF" == "preview" || "$VERCEL_GIT_COMMIT_REF" == "main" ]] && ! [[ "$VERCEL_GIT_COMMIT_REF" =~ ^feat\/ ]]; then
    echo "✅ - Build can proceed"
    exit 1;
else
    echo "🛑 - Build cancelled"
    exit 0;
fi