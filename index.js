import Fuse from 'fuse.js';
import fs from 'fs';

const jsonData = JSON.parse(fs.readFileSync('db.text.json'));

const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    includeScore: true,
    findAllMatches: true,
    minMatchCharLength: 2,
    threshold: 0.1,
    useExtendedSearch: true,
    ignoreLocation: true,
    keys: ['name_en', 'name_zh', 'intro'],
};

/**
 * 从db.text.json制作db.list.json
 *
 * [{
 *
 *   namespace: any;
 *
 *   name_en: any;
 *
 *   name_zh: any;
 *
 *   intro: any;
 *
 *   link: any;
 *
 *   } , ...... ]
 */
function outputlist() {
    /**
     * @type {[]}
    */
    const data = jsonData.data;
    const datalist = data.flatMap((item1) => {
        const item2list = Object.keys(item1.data).map((key) => {
            const item2 = item1.data[key];
            return {
                'sp': item1.namespace,
                'en': key,
                'zh': item2.name,
                'in': item2.intro,
                // 'links': item2.links,
            };
        });
        return item2list;
    });
    console.log(datalist.length);
    fs.writeFileSync('db.list.json', JSON.stringify(datalist, null, 2));
    fs.writeFileSync('db.list.min.json', JSON.stringify(datalist));

    const myIndex = Fuse.createIndex(options.keys, datalist);
    fs.writeFileSync('db.fuse.json', JSON.stringify(myIndex.toJSON()));
}

console.time('time');
outputlist();
console.timeEnd('time');

