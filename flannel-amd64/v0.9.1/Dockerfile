FROM ubuntu:16.04
MAINTAINER https://maichong.io
RUN apt-get update \
  && apt-get install -y --no-install-recommends curl dnsutils iproute2 net-tools ca-certificates iptables strongswan \
  && curl -sSLk https://github.com/coreos/flannel/releases/download/v0.9.1/flannel-v0.9.1-linux-amd64.tar.gz | tar -xz -C /tmp/ \
  && mkdir -p /opt/bin \
  && mv /tmp/flanneld /opt/bin/ \
  && rm -R /tmp/* \
  && apt-get remove -y curl \
  && apt-get autoremove -y \
  && apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/opt/bin/flanneld"]