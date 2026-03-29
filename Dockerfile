# dùng node LTS
FROM node:20

# install mongoimport (mongodb-database-tools)
COPY --from=mongo:4.2.14 /usr/bin/mongoimport /usr/local/bin/mongoimport

# tạo thư mục app trong container
WORKDIR /app

# copy package
COPY package*.json ./

# install dependency
RUN npm install --legacy-peer-deps

# copy source code
COPY . .

# build nestjs
RUN npm run build

# mở port
EXPOSE 3000

# chạy migration rồi start app
CMD npm run start:dev
