mkdir ../api/public/app
cp -r .output/public/* ../api/public/app
cp ../api/public/app/index.html ../api/resources/views/app.blade.php
echo "done deploying"
