#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "📥 Downloading images..."

curl -L -A "Mozilla/5.0" -o posts/essays/st-olaf-english-institutional-religion/southwark-cathedral.jpg \
  "https://commons.wikimedia.org/wiki/Special:FilePath/Southwark_Cathedral_2006.jpg"

curl -L -A "Mozilla/5.0" -o posts/essays/st-olaf-english-institutional-religion/st-olaf.jpg \
  "https://commons.wikimedia.org/wiki/Special:FilePath/Olaf_den_Hellige,_maleri_av_Peter_Nicolai_Arbo_(1831_-_1892).jpg"

curl -L -A "Mozilla/5.0" -o posts/essays/st-olaf-english-institutional-religion/good-samaritan-wijnants.jpg \
  "https://commons.wikimedia.org/wiki/Special:FilePath/Jan_Wijnants_-_Parable_of_the_Good_Samaritan.jpg"

echo "✅ Images downloaded:"
ls -lh posts/essays/st-olaf-english-institutional-religion/*.jpg

echo ""
echo "📤 Committing and pushing to GitHub..."

git add -A
git commit -m "Fix: proper images for St Olaf essay — Jonathan Lancaster"
git push origin main

echo ""
echo "🎉 Done! Site will be live at https://www.rabatreview.org in ~2 minutes."
echo "   Watch the build: https://github.com/rabat-review-of-books/rabat-review-of-books.github.io/actions"
