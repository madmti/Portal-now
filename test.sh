if [ -z "$1" ]; then
  echo "Please provide a test file name"
  exit 1
fi

if [ ! -f "./db/test/$1.test.ts" ]; then
  echo "Test file not found"
  exit 1
fi

bunx --bun astro db execute ./db/test/$1.test.ts --remote
