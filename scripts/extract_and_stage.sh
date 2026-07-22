#!/usr/bin/env bash
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

# Ensure we are on the correct branch
git fetch origin
git checkout add-content-and-agpeya || git checkout -b add-content-and-agpeya origin/main

echo "Creating data directories..."
mkdir -p "STgeorge-main/assets/data/agpeya"
mkdir -p "STgeorge-main/assets/data/bible"
mkdir -p "STgeorge-main/assets/data/commentary/new"
mkdir -p "STgeorge-main/assets/data/commentary/old"

echo "Unzipping content archives (if present)..."
unzip -o "STgeorge-main/assets/content_zips/الاجبيه_json.zip" -d "STgeorge-main/assets/data/agpeya" || true
unzip -o "STgeorge-main/assets/content_zips/الكتاب المقدس.zip" -d "STgeorge-main/assets/data/bible" || true
unzip -o "STgeorge-main/assets/content_zips/تفسير عهد جديد.zip" -d "STgeorge-main/assets/data/commentary/new" || true
unzip -o "STgeorge-main/assets/content_zips/تفسير عهد قديم .zip" -d "STgeorge-main/assets/data/commentary/old" || true

echo "Staging extracted files..."
git add STgeorge-main/assets/data || true

if git diff --cached --quiet; then
  echo "No new files to commit."
else
  git commit -m "Add extracted content JSON from zips"
  echo "Committed extracted JSON to branch add-content-and-agpeya."
fi

echo "Done. If you want to push: git push origin add-content-and-agpeya"
