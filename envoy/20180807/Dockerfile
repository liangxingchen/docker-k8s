FROM ubuntu:16.04

RUN useradd -m --uid 1337 istio-proxy \
  && echo "istio-proxy ALL=NOPASSWD: ALL" >> /etc/sudoers \
  && mkdir /etc/envoy \
  && chown istio-proxy /etc/envoy \
  && apt-get update \
  && apt-get install -y --no-install-recommends iproute2 iptables ca-certificates \
  && apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

COPY --from=envoyproxy/envoy /usr/local/bin/envoy /usr/local/bin/envoy

COPY *.sh /

ENTRYPOINT ["/entrypoint.sh"]
