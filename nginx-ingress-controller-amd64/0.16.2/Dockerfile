FROM quay.io/kubernetes-ingress-controller/nginx-ingress-controller-amd64:0.16.2
MAINTAINER https://maichong.io
RUN apt-get update;apt-get install -y --no-install-recommends ca-certificates;apt-get clean;rm -rf /var/lib/apt/lists/*
COPY ca.pem /etc/ssl/certs/Maichong.pem 