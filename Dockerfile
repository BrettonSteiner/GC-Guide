FROM node:10 AS front-build
WORKDIR /usr/src/app
COPY front/ ./front/
RUN cd front && npm install && npm run build

FROM node:10 AS back-build
WORKDIR /root/
COPY --from=front-build /usr/src/app/front/build ./front/build
COPY back/package*.json ./back/
RUN cd back && npm install
COPY back/ ./back/

EXPOSE 3080

CMD ["node", "./back/bin/www"]