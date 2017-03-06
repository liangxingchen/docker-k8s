/**
 * @copyright Maichong Software Ltd. 2017 http://maichong.it
 * @date 2017-03-06
 * @author Liang <liang@maichong.it>
 */

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const kubeImages = [
    'hyperkube-amd64',
    'kube-apiserver-amd64',
    'kube-controller-manager-amd64',
    'kube-proxy-amd64',
    'kube-scheduler-amd64'
];

const kubeTags = ['v1.5.3'];

const otherImages = {
    'etcd-amd64': ['3.0.17'],
    'kube-discovery-amd64': ['1.0'],
    'kube-dnsmasq-amd64': ['1.4'],
    'kubectl': ['v1.0.7'],
    'kubedns-amd64': ['1.9'],
    'pause-amd64': ['3.0'],
    'kubernetes-dashboard-amd64': ['1.5.1']
};

function update(image, tag) {
    console.log('update ' + image + ':' + tag);
    let file = path.join(process.cwd(), image, tag, 'Dockerfile');
    mkdirp.sync(path.dirname(file));
    let content = `FROM gcr.io/google_containers/${image}:${tag}\nMAINTAINER Liang <liang@maichong.it>`;
    fs.writeFileSync(file, content);
}

kubeImages.forEach((image) => {
    kubeTags.forEach((tag) => update(image, tag));
});

Object.keys(otherImages).forEach((image) => {
    otherImages[image].forEach((tag) => update(image, tag));
});