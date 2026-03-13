FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# installer netcat pour tester la connexion
RUN apt-get update && apt-get install -y netcat-openbsd

EXPOSE 3000

CMD sh -c "until nc -z db 5432; do echo 'Waiting for database...'; sleep 2; done; node src/server.js"