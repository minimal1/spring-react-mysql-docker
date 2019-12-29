FROM node as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY react/package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY react/ /usr/src/app

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

RUN npm run build

# Nginx
FROM nginx

RUN rm -rf /etc/nginx/conf.d
COPY nginx/conf /etc/nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]