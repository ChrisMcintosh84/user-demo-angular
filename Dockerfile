FROM node:18.13-alpine

WORKDIR /app

RUN npm install -g @angular/cli@17.0.3

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN ng add @ng-bootstrap/ng-bootstrap@16.0.0 --skip-confirmation

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
