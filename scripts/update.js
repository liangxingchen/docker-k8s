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
    'hyperkube-amd64',
    'kube-apiserver-amd64',
    'kube-controller-manager-amd64',
    'kube-proxy-amd64',
    'kube-scheduler-amd64'
];

const kubeTags = ['v1.5.3', 'v1.6.1', 'v1.6.3', 'v1.6.4', 'v1.8.1'];

const otherImages = {
    'etcd-amd64': ['3.0.17'],
    'kube-discovery-amd64': ['1.0'],
    'kube-dnsmasq-amd64': ['1.4', '1.4.1'],
    'kubectl': ['v1.0.7'],
    'kubedns-amd64': ['1.9'],
    'pause-amd64': ['3.0'],
    'kubernetes-dashboard-amd64': ['v1.5.1', 'v1.6.0', 'v1.7.1'],
    'nginx-ingress-controller': ['0.9.0-beta.3', '0.9.0-beta.5'],
    'nginx-ingress-controller-amd64': ['0.9.0-beta.15'],
    'defaultbackend-amd64': ['1.3'],
    'k8s-dns-kube-dns-amd64': ['1.14.1', '1.14.2', '1.14.6'],
    'k8s-dns-dnsmasq-amd64': ['1.14.1', '1.14.2', '1.14.6'],
    'k8s-dns-dnsmasq-nanny-amd64': ['1.14.1', '1.14.2', '1.14.6'],
    'k8s-dns-sidecar-amd64': ['1.14.1', '1.14.2', '1.14.6'],
    'exechealthz-amd64': ['v1.2.0'],
    'fluentd-elasticsearch': ['1.22', 'v2.0.1'],
    'elasticsearch': ['v2.4.1-2', 'v5.6.2'],
    'kibana': ['v4.6.1-1', 'v5.4.0'],
};

const withCA = [
    'hyperkube-amd64',
    'kube-apiserver-amd64',
    'kube-controller-manager-amd64',
    'kube-scheduler-amd64',
    'kube-proxy-amd64',
    'kubectl',
    'kubedns-amd64',
    'k8s-dns-kube-dns-amd64',
    'kubernetes-dashboard-amd64',
];

function update(image, tag) {
    console.log('update ' + image + ':' + tag);
    let file = path.join(process.cwd(), image, tag, 'Dockerfile');
    mkdirp.sync(path.dirname(file));
    let content = `FROM gcr.io/google_containers/${image}:${tag}\nMAINTAINER https://maichong.io`;

    if (withCA.indexOf(image) > -1) {
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