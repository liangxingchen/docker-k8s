FROM gcr.io/google_containers/k8s-dns-kube-dns-amd64:1.14.2
MAINTAINER Liang <liang@maichong.it>
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && apt-get clean && rm -rf /var/lib/apt/lists/* 