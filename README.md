1. Update /etc/hosts to override host to 127.0.0.1
2. `REMOTE_API_URL=https://<host> npm run dev`

E.g. for fly.io: `REMOTE_API_URL=https://77.83.143.220 nr dev`

To renew certs:

mkcert localhost.ssl
