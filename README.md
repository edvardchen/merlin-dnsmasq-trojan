## Prerequisites

1. 刷官方 merlin 固件

   1. 可以从[官网](https://www.asuswrt-merlin.net/) 或者[XWRT-VORTEX](http://xvtx.ru/xwrt/index.htm) 下载

2. 开启路由器的 SSH 访问

   从 web 登录路由器，进入 `系统管理 -> 系统设置`找到 `启动SSH`

   要求使用 [秘钥方式](https://git-scm.com/book/zh/v2/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5) 登录

3. 开启 JFFS 目录

   从 web 登录路由器，进入 `系统管理 -> 系统设置`找到 `Enable JFFS custom scripts and configs`

   为什么？路由器的大部分目录是只读的，不允许写入，**`/jffs` 是个例外**，但是不建议频繁写入，引用理由如下：

   > 在 JFFS 分区过于频繁的写入可能将过早磨损闪存芯片（写入周期有限）。因此我们应该将经常被写入的文件（如高活动日志文件）存储在 USB 磁盘上而非 JFFS 分区。更换磨损的 USB 闪存磁盘要比更换整个路由器（如果闪存扇区磨损）便宜得多。
   >
   > from http://blog.gqylpy.com/gqy/16504/

4. 安装 entware

   entware 是一个包管理工具，类似 `pip`、`brew`。安装 entware 要求插入额外的 U 盘，

   merlin 可以通过 `amtm` 或者 `entware-setup.sh` 安装 entware

   1. 安装后，我们可以通过 opkg 命令快速安装第三方工具，同时：
   2. `/opt` `/tmp` `/etc` 等目录会重新指向 U 盘上的某个目录，方便我们把一些配置放在这些地方

## Installation

1. 在路由器上安装 rsync

   ```bash
   opkg install rsync
   ```

2. 准备以透明代理模式运行的 trojan 配置 `nat.json`，置于 `trojan/trojan-configs`目录下

   ```jsonc
   {
     "run_type": "nat",
     "local_addr": "0.0.0.0",
     "local_port": 1080,
     "remote_addr": "YOUR_REMOTE_ADDR",
     "remote_port": 443,
     "password": ["YOUR_PWD"],
     "log_level": 1,
     "log_file": "/jffs/home/nat.log",
     "ssl": {
       // YOUR TLS SETTINGS
     }
   }
   ```

3. 运行本项目安装脚本

   ```bash
   yarn zx ./install-trojan.mjs
   ```
