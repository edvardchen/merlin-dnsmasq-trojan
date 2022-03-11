const { fs } = require("zx");

const [, , , sshServer = "10.0.2.1", configFolder = "/jffs/jianhua", port = "1081"] = process.argv;

// unzip trojan
const trojanZip = "trojan-go-linux-arm.zip";
await $`unzip ./trojan/${trojanZip} -d ./trojan/trojan-go-linux-arm`;

// replace config_home with user defined folder
for (const file of ["./trojan/apply_iptables", "./trojan/dnsmasq.conf.add"]) {
  await replaceText(file, (content) => {
    return content.replace(/\$config_home/g, configFolder).replace(/\$port/g, port);
  });
}

// upload essential resources
await $`rsync -av ./trojan ${sshServer}:${configFolder}`;

const command = `cd ${configFolder}/trojan && sh ./setup.sh`;
await $`ssh ${sshServer} ${command}`;

await $`git checkout .`;

async function replaceText(file, fn) {
  const original = await fs.readFile(file, "utf8");
  await fs.writeFile(file, fn(original));
}
