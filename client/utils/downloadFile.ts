import noop from 'lodash/noop';

export function downloadFile(data: string, name = 'NoName') {
    try {
        const link = document.createElement('a');
        link.style.display = 'none';
        link.setAttribute('href', URL.createObjectURL(new Blob([data], {type: 'application/octet-stream'})));
        link.setAttribute('download', name);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (e) {
        noop(e);
    }
}
