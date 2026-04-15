import fs from "fs";

const t = fs.readFileSync("src/lib/products.ts", "utf8");
const re = /\{ id: (\d+), name: "([^"]+)",[^}]+description: "([^"]+)"/g;
const o = {};
let m;
while ((m = re.exec(t))) {
  o[m[1]] = { name: m[2], description: m[3] };
}
console.log("count", Object.keys(o).length);
fs.writeFileSync("src/lib/i18n/_extracted-tr.json", JSON.stringify(o, null, 0));
