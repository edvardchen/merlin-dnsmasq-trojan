#!/usr/bin/env sh

# setup trojan
mv ./trojan-go-linux-arm/trojan-go /opt/bin/
mv ./trojan-nat ./trojan-forward /opt/etc/init.d/
/opt/etc/init.d/trojan-nat start
/opt/etc/init.d/trojan-forward start

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
