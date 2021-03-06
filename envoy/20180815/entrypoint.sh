#!/bin/bash

if [ "$1" == "init" ]; then
  /istio-iptables.sh -p 15001 -u 1337 -m REDIRECT -i 240.240.0.0/12
else
  /gen-config.sh > /etc/envoy/envoy.yaml
  /usr/local/bin/envoy -c /etc/envoy/envoy.yaml --disable-hot-restart --service-cluster ${ENVOY_SERVICE_CLUSTER} --service-node ${ENVOY_SERVICE_NODE} --max-obj-name-len 189 -l ${ENVOY_LOG_LEVEL-'warn'} --v2-config-only
fi
