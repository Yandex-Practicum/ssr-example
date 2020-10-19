interface Options {
    download?: boolean | string;
    target: '_self' | '_blank';
}

/**
 * Usage:
    triggerLink(downloadURL, {
        download: true,
        target: '_blank',
    });
 */
export default function triggerLink(link: string, options: Options = {target: '_blank'}) {
    options = Object.assign({target: '_blank', download: false}, options);

    const element = document.createElement('a');
    element.href = link;
    element.target = options.target;

    if (options.download === true) {
        element.download = 'yes';
    } else if (typeof options.download === 'string') {
        element.download = options.download;
    }

    element.dispatchEvent(new MouseEvent('click'));
}
