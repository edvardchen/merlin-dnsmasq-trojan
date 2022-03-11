#!/usr/bin/env sh

# setup trojan
mv ./trojan-go-linux-arm/trojan-go /opt/bin/
mv ./ServiceTrojan /opt/etc/init.d/ServiceTrojan
/opt/etc/init.d/ServiceTrojan start

# domain -> ipset
mv ./dnsmasq.conf.add /jffs/configs/
# 重启 dnsmasq
service dnsmasq_restart

# use iptables to forward gw traffic
mv ./apply_iptables /opt/bin/
# first time
apply_tables

# check regularly
mv ./jffs-scripts/* /jffs/scripts/
# first time
/jffs/scripts/wan-event 1 connected
