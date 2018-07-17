/**
 * @copyright Maichong Software Ltd. 2017 http://maichong.it
 * @date 2017-03-06
 * @author Liang <liang@maichong.it>
 */

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const caContent = fs.readFileSync(__dirname + '/ca.pem');

const kubeImages = [
    // 'hyperkube-amd64',
    'kube-apiserver-amd64',
    'kube-controller-manager-amd64',
    'kube-proxy-amd64',
    'kube-scheduler-amd64'
];

const kubeTags = [
    // 'v1.5.3', 'v1.6.1', 'v1.6.3', 'v1.6.4', 'v1.8.1',
    'v1.9.2'
];

const otherImages = {
    'etcd-amd64': ['3.0.17', '3.1.10', '3.2.14'],
    // 'kube-discovery-amd64': ['1.0'],
    // 'kube-dnsmasq-amd64': ['1.4', '1.4.1'],
    // 'kubectl': ['v1.0.7'],
    // 'kubedns-amd64': ['1.9'],
    'pause-amd64': ['3.0', '3.1'],
    // 'kubernetes-dashboard-amd64': ['v1.5.1', 'v1.6.0', 'v1.7.1', 'v1.8.2'],
    'nginx-ingress-controller-amd64': ['0.9.0-beta.15', '0.16.2'],
    'defaultbackend-amd64': ['1.3', '1.4'],
    // 'k8s-dns-kube-dns-amd64': ['1.14.1', '1.14.2', '1.14.6', '1.14.8'],
    // 'k8s-dns-dnsmasq-amd64': ['1.14.1', '1.14.2', '1.14.6', '1.14.8'],
    'k8s-dns-dnsmasq-nanny-amd64': ['1.14.1', '1.14.2', '1.14.6', '1.14.8'],
    'k8s-dns-sidecar-amd64': ['1.14.1', '1.14.2', '1.14.6', '1.14.8'],
    // 'exechealthz-amd64': ['v1.2.0'],
    // 'fluentd-elasticsearch': ['1.22', 'v2.0.1', 'v2.0.3'],
    // 'elasticsearch': ['v2.4.1-2', 'v5.6.2', 'v5.6.4'],
    // 'kibana': ['v4.6.1-1', 'v5.4.0'],
};

const withCA = [
    // 'hyperkube-amd64',
    // 'kube-apiserver-amd64',
    // 'kube-controller-manager-amd64',
    // 'kube-scheduler-amd64',
    'kube-proxy-amd64',
    // 'kubectl',
    // 'kubedns-amd64',
    // 'k8s-dns-kube-dns-amd64',
    // 'kubernetes-dashboard-amd64',
    'nginx-ingress-controller-amd64'
];

const fromQuay = {
    'nginx-ingress-controller-amd64': 'kubernetes-ingress-controller/nginx-ingress-controller-amd64'
};

// 需要手动升级的:
// kubedns-amd64
// kubelet-amd64


function update(image, tag) {
    console.log('update ' + image + ':' + tag);
    let file = path.join(process.cwd(), image, tag, 'Dockerfile');
    mkdirp.sync(path.dirname(file));
    let content = `FROM gcr.io/google_containers/${image}:${tag}\nMAINTAINER https://maichong.io`;

    if (fromQuay[image]) {
        content = `FROM quay.io/${fromQuay[image]}:${tag}\nMAINTAINER https://maichong.io`;
    }

    if (withCA.indexOf(image) > -1) {
        content += '\nRUN apt-get update;apt-get install -y --no-install-recommends ca-certificates;apt-get clean;rm -rf /var/lib/apt/lists/*';
        content += '\nCOPY ca.pem /etc/ssl/certs/Maichong.pem ';
        let caFile = path.join(process.cwd(), image, tag, 'ca.pem');
        fs.writeFileSync(caFile, caContent);
    }
    fs.writeFileSync(file, content);
}

kubeImages.forEach((image) => {
    kubeTags.forEach((tag) => update(image, tag));
});

Object.keys(otherImages).forEach((image) => {
    otherImages[image].forEach((tag) => update(image, tag));
});
