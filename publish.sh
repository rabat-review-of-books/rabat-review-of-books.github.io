#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "📥 Downloading images..."

# Southwark Cathedral — direct thumbnail from upload.wikimedia.org
curl -L \
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -H "Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8" \
  --retry 3 \
  -o posts/essays/st-olaf-english-institutional-religion/southwark-cathedral.jpg \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Southwark_Cathedral_2006.jpg/1200px-Southwark_Cathedral_2006.jpg"

echo "  Cathedral: $(file posts/essays/st-olaf-english-institutional-religion/southwark-cathedral.jpg | cut -d: -f2)"

# St Olaf painting by Peter Nicolai Arbo — direct thumbnail
curl -L \
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -H "Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8" \
  --retry 3 \
  -o posts/essays/st-olaf-english-institutional-religion/st-olaf.jpg \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Olaf_den_Hellige%2C_maleri_av_Peter_Nicolai_Arbo_%281831_-_1892%29.jpg/800px-Olaf_den_Hellige%2C_maleri_av_Peter_Nicolai_Arbo_%281831_-_1892%29.jpg"

echo "  St Olaf:   $(file posts/essays/st-olaf-english-institutional-religion/st-olaf.jpg | cut -d: -f2)"

# Good Samaritan — already good, re-download to be safe
curl -L \
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -H "Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8" \
  --retry 3 \
  -o posts/essays/st-olaf-english-institutional-religion/good-samaritan-wijnants.jpg \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Jan_Wijnants_-_Parable_of_the_Good_Samaritan.jpg/1200px-Jan_Wijnants_-_Parable_of_the_Good_Samaritan.jpg"

echo "  Samaritan: $(file posts/essays/st-olaf-english-institutional-religion/good-samaritan-wijnants.jpg | cut -d: -f2)"

echo ""
echo "✅ All images:"
ls -lh posts/essays/st-olaf-english-institutional-religion/*.jpg

echo ""
echo "📤 Committing and pushing to GitHub..."

git add -A
git commit -m "Fix images + style: St Olaf essay now matches magazine layout"
git push origin main

echo ""
echo "🎉 Done! Site rebuilds in ~2 minutes."
echo "   Watch: https://github.com/rabat-review-of-books/rabat-review-of-books.github.io/actions"
