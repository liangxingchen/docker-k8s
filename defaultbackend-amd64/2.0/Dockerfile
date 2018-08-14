FROM golang:1.10.3

COPY index.html /build/dist/
COPY 404.png /build/dist/
COPY server.go /build/

WORKDIR /build

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 GOARM=6 go build -ldflags '-w -s' -o dist/server

FROM scratch

COPY --from=0 /build/dist/* /

USER 65534:65534

ENTRYPOINT ["/server"]