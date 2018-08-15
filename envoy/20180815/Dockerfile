FROM ubuntu:16.04

RUN useradd -m --uid 1337 istio-proxy \
  && mkdir /etc/envoy \
  && chown istio-proxy /etc/envoy \
  && apt-get update \
  && apt-get install -y --no-install-recommends iproute2 iptables ca-certificates busybox sudo \
  && apt-get clean \
	&& rm -rf /var/lib/apt/lists/* \
  && for cmd in `busybox --list | grep -v '\['`; do if [ -z `which $cmd` ];then ln -s /bin/busybox /bin/$cmd; fi ; done \
  && echo "istio-proxy ALL=NOPASSWD: ALL" >> /etc/sudoers

COPY --from=envoyproxy/envoy /usr/local/bin/envoy /usr/local/bin/envoy

COPY *.sh /

ENTRYPOINT ["/entrypoint.sh"]
