FROM node:16.14.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install npm dependencies
COPY ./Backend/package.json /usr/src/app/package.json
RUN npm install

# copy over the source files
COPY ./Backend /usr/src/app

CMD npm run dev
