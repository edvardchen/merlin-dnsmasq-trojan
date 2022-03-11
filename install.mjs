const { fs } = require("zx");

const [, , , sshServer = "10.0.2.1", configFolder = "/jffs/jianhua/trojan", port = "1081"] =
  process.argv;

// unzip trojan
const trojanZip = "trojan-go-linux-arm.zip";
await $`unzip ./trojan/${trojanZip} ${path.basename(trojanZip)}`;

// replace config_home with user defined folder
for (const file of ["./trojan/apply_iptables", "./trojan/dnsmasq.conf.add"]) {
  await replaceText(file, (content) => {
    return content.replace("$config_home", configFolder).replace("$port", port);
  });
}

// upload essential resources
await $`rsync -av ./trojan ${sshServer}:${configFolder}`;

const command = `sh ${configFolder}/setup.sh`;
await $`ssh ${sshServer} ${command}`;

async function replaceText(file, fn) {
  const original = await fs.readFile(file, "utf8");
  await fs.writeFile(file, fn(original));
}
