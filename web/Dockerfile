FROM node:lts-alpine as client-stage
WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build


FROM golang:latest as build-stage
WORKDIR /go/src/br-app/web/server/
COPY server/go.mod server/go.sum ./
RUN go mod download
COPY server/ .
RUN GOOS=linux CGO_ENABLED=0 go build -o main .


FROM alpine:latest
WORKDIR /root/
COPY --from=client-stage /app/dist ./dist
COPY --from=build-stage /go/src/br-app/web/server/main ./main
EXPOSE 80
CMD [ "./main" ]
