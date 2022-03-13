const { fs } = require("zx");

const [, , , sshServer = "10.0.2.1", configFolder = "/jffs/jianhua", port = "1081"] = process.argv;

// replace config_home with user defined folder
for (const file of [
  "./trojan/apply_iptables",
  "./trojan/dnsmasq.conf.add",
  "./trojan/jffs-scripts/services-start",
  "./trojan/jffs-scripts/wan-event",
  "./trojan/start_trojan",
]) {
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
