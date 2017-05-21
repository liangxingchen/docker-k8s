FROM gcr.io/google_containers/kube-proxy-amd64:v1.5.3
MAINTAINER Liang <liang@maichong.it>
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && apt-get clean && rm -rf /var/lib/apt/lists/* 