#!/usr/bin/env sh

# setup trojan
unzip -o trojan-go-linux-arm.zip -d ./trojan-go-linux-arm
cp ./trojan-go-linux-arm/trojan-go /opt/bin/
sh ./start_trojan

# domain -> ipset
mv ./dnsmasq.conf.add /jffs/configs/
# 重启 dnsmasq
service dnsmasq_restart

# use iptables to forward gw traffic
mv ./apply_iptables /opt/bin/
# first time
apply_iptables

# check regularly
mv ./jffs-scripts/* /jffs/scripts/
# first time
/jffs/scripts/wan-event 1 connected
