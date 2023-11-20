FROM node:19-alpine3.17 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#RUN npm run dev
#RUN npm run build
CMD ["npm", "run", "dev"]

#Ejecutamos un servidor web de producción directamente
#CMD npx serve -s build -l 3000

# Exponemos el puerto
EXPOSE 3000
