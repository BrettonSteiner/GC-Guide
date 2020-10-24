FROM node:10 AS front-build
WORKDIR /usr/src/app
COPY front/ ./front/
RUN cd front && npm install && npm run build

FROM node:10 AS back-build
WORKDIR /root/
COPY --from=front-build /usr/src/front/build ./front/build
COPY back/package*.json ./back/
RUN cd back && npm install
COPY back/app.js ./api/

EXPOSE 3080

CMD ["node", "./back/app.js"]