const app = require("./app");

async function main() {
  await app.listen(app.get("port"));
  console.log("Server en port", app.get("port"));
}

main();
