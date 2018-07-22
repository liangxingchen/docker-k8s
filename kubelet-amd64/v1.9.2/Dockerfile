FROM ubuntu:16.04
MAINTAINER https://maichong.io
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl iptables ca-certificates \
    && curl -sSLk https://dl.k8s.io/v1.9.2/kubernetes-node-linux-amd64.tar.gz | tar -xz -C /tmp/ \
    && cp /tmp/kubernetes/node/bin/kubelet /usr/local/bin/ \
    && rm -R /tmp/kubernetes \
    && apt-get remove -y curl \
    && apt-get clean \
	&& rm -rf /var/lib/apt/lists/*
COPY ca.pem /etc/ssl/certs/Maichong.pem
