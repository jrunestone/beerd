// replaces every environment variable in process.env with its _xxx counterpart if available
// e.g. used to set MYKEY to MYKEY_development in dev
// import this script wherever accessing process.env

const fmt = `{key}_${process.env.NODE_ENV}`;
const keys = Object.keys(process.env);
console.log(keys);
for (let key of keys) {
    const findKey = fmt.replace('{key}', key);
    console.log(key, findKey);
    if (keys.indexOf(findKey) !== -1) {
        console.log('yes');
        process.env[key] = process.env[findKey];
    }
}