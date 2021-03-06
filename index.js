const traverse = inp => {
    let out = Object.keys(inp).reduce((obj, key) => {
        if (typeof obj[key] == "object") {
            obj[key] = traverse(obj[key])
        }
        if (typeof obj[key] == "function") {
            str = obj[key].toString()

            let matches = [
                ...str.matchAll(/this\.requires\.([A-Za-z0-9\_\-\/\~]+)/),
                ...str.matchAll(/this\.requires\[\'([A-Za-z0-9\_\-\/\~]+)\'\]/),
                ...str.matchAll(/this\.requires\[\"([A-Za-z0-9\_\-\/\~]+)\"\]/)
            ]
            if (matches.length > 0) {
                obj.requires = {}
            }
            matches.forEach(match => {
                let name = match[1]
                obj.requires[name] = require(name)
            })
        }
        return obj
    }, inp)
    return out;
}

module.exports = inp => {
    if (typeof inp.main !== "function") {
        throw new Error("Input has no main func")
    }
    let out = inp
    out = traverse(out)
    out.main(process.argv)
}