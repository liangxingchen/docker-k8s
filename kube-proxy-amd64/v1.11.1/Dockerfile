FROM gcr.io/google_containers/kube-proxy-amd64:v1.11.1
MAINTAINER https://maichong.io
RUN apt-get update;apt-get install -y --no-install-recommends ca-certificates;apt-get clean;rm -rf /var/lib/apt/lists/*
COPY ca.pem /etc/ssl/certs/Maichong.pem 