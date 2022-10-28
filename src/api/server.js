import data from '../data/sdks.json';

/* duplicated id's (applovin, stripe, intercom) */

export function fetchAll() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 1000);
    });
}

export function fetchByTags(neededTag = '') {
    return new Promise((resolve, reject) => {
        if (!neededTag) {
            reject('No tags found!')
        }

        const result = data.filter(({tags = []}) => tags && tags.includes(neededTag));
        result.sort(function ({title: titleA = ''}, {title: titleB = ''}) {
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
        });
        resolve(result);
    });
}

export function fetchByValue(string = '') {
    return new Promise((resolve) => {
        setTimeout(() => {
            const val = string.trim();
            if(!val) {
                return resolve(data);
            }

            const result = data.filter(({title = ''}) => !!title && title.toLowerCase().includes(val.toLowerCase()));
            return resolve(result);
        }, 1000);
    });
}
