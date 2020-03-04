// replaces every environment variable in process.env with its _xxx counterpart if available
// e.g. used to set MYKEY to MYKEY_development in dev

const fmt = `{key}_${process.env.NODE_ENV}`;
const keys = Object.keys(process.env);

for (let key of keys) {
    const findKey = fmt.replace('{key}', key);

    if (keys.indexOf(findKey) !== -1) {
        process.env[key] = process.env[findKey];
        console.log(key, findKey, process.env[key]);
    }
}