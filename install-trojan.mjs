const { fs } = require("zx");

const [, , , sshServer = "192.168.2.1", port = "1080"] = process.argv;

await $`ssh ${sshServer} "opkg install rsync"`;

// replace config_home with user defined folder
// for (const file of ["./trojan/scripts/apply_iptables"]) {
//   await replaceText(file, (content) => {
//     return content.replace(/\$port/g, port);
//   });
// }

// upload essential resources
await $`rsync -av ./trojan/ ${sshServer}:/jffs/home/`;

const command = `cd /jffs/home/ && sh ./setup-trojan.sh`;
await $`ssh ${sshServer} ${command}`;

async function replaceText(file, fn) {
  const original = await fs.readFile(file, "utf8");
  await fs.writeFile(file, fn(original));
}
