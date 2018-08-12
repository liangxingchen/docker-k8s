#!/bin/bash

cat <<EOF
admin:
  access_log_path: /dev/stdout
  address:
    socket_address: { address: 127.0.0.1, port_value: 15000 }

node:
  id: ${ENVOY_SERVICE_NODE}
  cluster: ${ENVOY_SERVICE_CLUSTER}
  metadata:
    pod: "${POD}"
    namespace: ${NAMESPACE}
    ingress: "${INGRESS}"
    uuid: "${ENVOY_UUID}"
    token: "${TOKEN}"

dynamic_resources:
  ads_config:
    api_type: GRPC
    refresh_delay: 1s
    grpc_services:
      - envoy_grpc:
          cluster_name: ${ENVOY_API_HOST}:${ENVOY_API_PORT}
  cds_config:
    ads: {}
  lds_config:
    ads: {}
  rds_config:
    ads: {}

static_resources:
  clusters:
  - name: ${ENVOY_API_HOST}:${ENVOY_API_PORT}
    connect_timeout: 10s
    type: LOGICAL_DNS
    lb_policy: ROUND_ROBIN
    hosts: [{ socket_address: { address: ${ENVOY_API_HOST}, port_value: ${ENVOY_API_PORT} }}]
    http2_protocol_options: {}
EOF

if [ -n "${ENVOY_API_TLS}" ]; then
cat <<EOF
    tls_context: 
      common_tls_context:
        alpn_protocols: h2
        validation_context:
          trusted_ca:
            filename: /etc/ssl/certs/ca-certificates.crt
EOF
fi