FROM node:22.3 as build
WORKDIR /app
COPY /package.json ./package.json
RUN npm install
RUN npm install -g @angular/cli
COPY / ./
RUN ng build
FROM nginx:alpine
COPY --from=build /app/dist/material-tailwind/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
