FROM ubuntu:16.04
MAINTAINER https://maichong.io
COPY kube-dns /kube-dns
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
COPY ca.pem /etc/ssl/certs/Maichong.pem
ENTRYPOINT [ "/kube-dns" ]