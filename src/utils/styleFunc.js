import {formatStamp} from './datetimeFunc'

export const openWindow = (url, title, w, h) => {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    if (window.focus) {
        newWindow.focus();
    }
};

export const generateButton = (label, icon, type, clickEvent, disabled = false) => {
    return {
        label: label,
        icon: icon,
        type: type,
        click: clickEvent,
        disabled: disabled,
        loading: false
    }
};

export function showAlter(params) {
    let body = document.getElementsByTagName('body')[0];

    let alterBox = document.createElement('div');
    let iconSpan = document.createElement('span');
    let messageSpan = document.createElement('span');
    let icon = document.createElement('i');

    iconSpan.className = 'alter-box-icon';
    messageSpan.className = 'alter-box-message';
    alterBox.className = 'cc-alter-box';

    messageSpan.innerText = params.message;

    let timeout = 2000;

    switch (params.type) {
        case 'success':
            icon.className = 'fa fa-check-circle';
            iconSpan.style.color = 'rgba(91,202,186,0.5)';
            break;
        case 'info':
            icon.className = 'fa fa-info-circle';
            iconSpan.style.color = '#48ace6';
            timeout = 3000;
            break;
        case 'warning':
            icon.className = 'fa fa-exclamation-circle';
            iconSpan.style.color = '#e69d38';
            timeout = 5000;
            break;
        case 'error':
            icon.className = 'fa fa-warning';
            iconSpan.style.color = '#e6363f';
            timeout = 6000;
            break;
        default:
            icon.className = 'fa fa-info-circle';
            iconSpan.style.color = '#48ace6';
            break;
    }

    iconSpan.appendChild(icon);
    alterBox.appendChild(iconSpan);
    alterBox.appendChild(messageSpan);

    body.appendChild(alterBox);


    setTimeout(() => {
        alterBox.style.top = '50px';
        alterBox.style.opacity = 1;

        setTimeout(() => {
            alterBox.style.opacity = 0;
            alterBox.style.top = '0px';

            setTimeout(() => {
                body.removeChild(alterBox)
            }, 400)
        }, params.timeout ? params.timeout : timeout)
    }, 100)
}

export const confirmAlter = (obj, message, callback) => {
    obj.$confirm(message, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        callback.success();
    }).catch(() => {
        callback.cancel();
    });
};

export const formatSize = (value) => {
    if (null === value || value === '') {
        return "0 Bytes";
    }
    let unitArr = [" Bytes", " KB", " MB", " GB"];
    let index = 0;
    let srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    let size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2);//保留的小数位数
    return size + unitArr[index];
};

export const sortBy = (field) => {
    return function (a, b) {
        if (a[field] === b[field] && a.name !== undefined) {
            if (a.name === b.name) {
                return a.name.length < b.name.length;
            }
            return a.name.length < b.name.length;
        } else {
            return a[field] > b[field];
        }
    }
};

export const initTreeTable = (createElement, {node, data, store}) => {
    let columnElement = [];
    if (data.name !== undefined) {
        columnElement.push(
            createElement("el-tooltip", {
                    attrs: {
                        class: "item",
                        content: data.name,
                        placement: "top",
                        effect: 'dark',
                        'open-delay': 500,
                        enterable: false
                    }
                },
                [
                    createElement("div", {
                            style: "margin-bottom: -3px; width: " + (150 - data.indent * 16) + "px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
                            attrs: {
                                class: "fa " + data.icon,
                            }
                        },
                        [
                            createElement("span", {
                                style: "margin-right:5px",
                                attrs: {
                                    class: "fa " + data.icon,
                                }
                            }),
                            data.name
                        ])
                ])
        )
    }

    if (data.classify !== undefined) {
        columnElement.push(
            createElement("div", {
                    style: "width: 50px; flex-grow: 1; margin-left: 40px; text-align: center",
                    attrs: {}
                },
                [
                    data.id === 0 ? data.classify : data.classify === 1 ? '页面' : data.classify === 2 ? '菜单' : '功能'
                ])
        )
    }

    if (data.is_locked !== undefined) {
        columnElement.push(
            createElement("div", {
                    style: "width: 80px; margin-left: 40px; text-align: center",
                    attrs: {}
                },
                [
                    data.id === 0 ? data.is_locked : data.is_locked === 1 ? "是" : "否"
                ])
        )
    }

    if (data.path !== undefined) {
        columnElement.push(
            createElement("el-tooltip", {
                    attrs: {
                        class: "item",
                        content: data.path,
                        placement: "top",
                        effect: 'light',
                        'open-delay': 500,
                        enterable: false
                    }
                },
                [
                    createElement("div", {
                            style: " width: 140px; flex-grow: 1; margin-left: 40px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
                            attrs: {}
                        },
                        [
                            data.path
                        ])
                ])
        )
    }

    if (data.order !== undefined) {
        columnElement.push(
            createElement("div", {
                    style: "width: 80px; margin-left: 40px; text-align: center",
                    attrs: {}
                },
                [
                    data.order
                ])
        )
    }

    if (data.creator !== undefined) {
        columnElement.push(
            createElement("div", {
                    style: "width: 80px; margin-left: 40px; text-align: center",
                    attrs: {}
                },
                [
                    data.creator
                ])
        )
    }

    if (data.create_time !== undefined) {
        columnElement.push(
            createElement("div", {
                    style: "width: 140px; flex-grow: 1; margin-left: 40px; text-align: center",
                    attrs: {}
                },
                [
                    data.id === 0 ? data.create_time : formatStamp(data.create_time)
                ])
        )
    }

    if (data.updater !== undefined) {
        columnElement.push(
            createElement("div", {
                    style: "width: 80px; margin-left: 40px; text-align: center",
                    attrs: {}
                },
                [
                    data.updater || data.updater === 0 ? data.updater : '无'
                ])
        )
    }

    if (data.update_time !== undefined) {
        columnElement.push(
            createElement("div", {
                    style: "min-width: 140px; flex-grow: 1; margin-left: 40px;  margin-right: 10px; text-align: center",
                    attrs: {}
                },
                [
                    data.id === 0 ? data.update_time : formatStamp(data.update_time)
                ])
        )
    }
    let rootNodeAttrs = {
        style: "display:  inline-flex; flex-grow: 1; width: 96%; flex-direction: row; flex-wrap: nowrap; align-items: center",
    };
    return createElement("div", rootNodeAttrs, columnElement);
};

export const initRootNode = (obj, data, field, value, sort) => {
    let children = [];
    data.forEach(item => {
        if (item[field] === value) {
            item.indent = 2;
            obj.push(item)
        } else {
            children.push(item)
        }
    });

    if (sort)
        obj.sort(sortBy(sort));
    return children;
};

export const initChildNode = (parentMenu, childrenMenu, pField, cField, sort) => {
    parentMenu.forEach(item => {
        let children = [];
        childrenMenu.forEach(subItem => {
            if (item[pField] === subItem[cField]) {
                subItem.indent = item.indent + 1;
                children.push(subItem);
            }
        });
        if (sort)
            children.sort(sortBy(sort));
        item.children = children;
        initChildNode(item.children, childrenMenu, pField, cField, sort)
    })
};

export const initSelectTree = (createElement, {node, data, store}) => {
    let columnElement = [
        createElement("el-tooltip", {
                attrs: {
                    class: "item",
                    content: data.name,
                    placement: "top",
                    effect: 'light',
                    'open-delay': 500,
                    enterable: false
                }
            },
            [
                createElement("div", {
                        style: "margin-bottom: -3px; width: " + (150 - data.indent * 16) + "px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
                        attrs: {
                            class: "fa " + data.icon,
                        }
                    },
                    [
                        createElement("span", {
                                style: "",
                                attrs: {
                                    class: "fa " + data.icon,
                                }
                            }
                        ),
                        data.name
                    ]
                )
            ]
        )
    ];

    let rootNodeAttrs = {
        style: "display: inline-flex; width: " + (columnElement.length <= 7 ? '100%' : 'auto') + "; flex-direction: row; flex-wrap: nowrap; align-items: center",
    };
    return createElement("div", rootNodeAttrs, columnElement);
};