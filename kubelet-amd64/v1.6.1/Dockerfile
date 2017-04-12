FROM ubuntu:16.04

MAINTAINER LiangXingchen <liang@maichong.it>

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && curl -sSLk https://dl.k8s.io/v1.6.1/kubernetes-node-linux-amd64.tar.gz | tar -xz -C /tmp/ \
    && cp /tmp/kubernetes/node/bin/kubelet /usr/local/bin/ \
    && rm -R /tmp/kubernetes \
    && apt-get remove -y curl \
    && apt-get clean \
	&& rm -rf /var/lib/apt/lists/*
