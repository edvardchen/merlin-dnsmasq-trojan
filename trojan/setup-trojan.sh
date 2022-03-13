#!/usr/bin/env sh

set -e
rm -rf /jffs/configs/dnsmasq-configs /jffs/configs/ipset-configs /jffs/configs/trojan-configs
mv -f ./dnsmasq-configs ./ipset-configs ./trojan-configs /jffs/configs/
# domain -> ipset
# make sure dnsmasq.conf.add is placed in /jffs/configs
# mv ./dnsmasq.conf.add /jffs/configs/
# 重启 dnsmasq
service dnsmasq_restart

# setup trojan
mkdir -p ./trojan-go-linux-arm
unzip -o trojan-go-linux-arm.zip -d ./trojan-go-linux-arm
chmod +x ./trojan-go-linux-arm/trojan-go
cp ./trojan-go-linux-arm/trojan-go /opt/bin/
rm -rf ./trojan-go-linux-arm
rm trojan-go-linux-arm.zip

mv ./scripts/* /opt/bin/
start_trojan
apply_iptables

# check regularly
mv ./jffs-scripts/* /jffs/scripts/
# first time
/jffs/scripts/wan-event 1 connected
