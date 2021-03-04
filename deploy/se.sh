ssh handan "rm -rf /www/server"

zip -r server.zip server
scp server.zip handan:/www/
rm server.zip

ssh handan "cd /www && unzip server.zip && rm -f server.zip && cd server && pm2 restart index.js"
