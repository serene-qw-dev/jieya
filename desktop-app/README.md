# 解压研究所 Windows 桌面版

这是根据原微信小程序源码改造的 Windows 桌面应用项目，使用 Electron + HTML/CSS/JavaScript。它保留了原项目的核心玩法：

- **木鱼修行**：敲击音效、功德累计、木鱼形态进化、今日功德。
- **捏泡泡纸**：40 颗泡泡、随机彩蛋、连击提示、计时、评级与最佳纪录。
- **锤爆烦恼**：30 秒反应小游戏，普通目标 +1、幸运目标 +5，记录最高分。
- **今日求签**：每日随机签文、历史记录。
- **我的档案**：解压等级、统计、成就墙、音效开关和重置数据。

所有统计默认存储在当前电脑的本地应用数据中，不会自动上传。求签功能只作娱乐，不是预测或决策依据。桌面版的数据与微信小程序彼此独立，不会自动导入微信里的历史数据。

## 在 Windows 上生成安装包

### 方法一：一键生成

1. 安装 **Node.js 24 LTS**（安装时保留 npm 默认选项）。官网：<https://nodejs.org/>
2. 打开本文件所在文件夹。
3. 双击 `一键生成Windows安装包.bat`。
4. 首次运行需要联网下载依赖。成功后会自动打开 `dist` 文件夹。
5. 将 `解压研究所-1.0.0-Windows-x64.exe` 发给普通 Windows 用户安装；也可使用同目录的 ZIP 版本。

如果打包失败，先确认命令行中 `node -v` 和 `npm -v` 都能显示版本，再重新运行脚本。不要把 `node_modules` 文件夹上传到 GitHub。

### 方法二：命令行

在本文件夹打开 CMD 或 PowerShell：

```cmd
npm install
npm start
```

确认开发版可以运行后，生成安装包：

```cmd
npm run dist:win
```

生成文件位于 `dist` 文件夹。

## 发布到 GitHub，让所有人下载

如果你把本桌面版放在原仓库的 `desktop-app` 文件夹，并把压缩包根目录的 `.github` 文件夹复制到仓库根目录，下面的自动发布流程可以帮你生成 Windows 安装包：

1. 把 `desktop-app` 文件夹和根目录的 `.github/workflows/release-windows.yml` 放进你现有 Git 仓库。
2. 在仓库根目录执行：

   ```cmd
   git add .
   git commit -m "添加 Windows 桌面版"
   git push
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. 打开 GitHub 仓库的 **Actions** 页面，确认 `Build Windows release` 工作流运行成功。
4. 成功后打开仓库的 **Releases** 页面，发布会自动附上 `.exe` 安装程序和 `.zip` 便携包。
5. 把下面链接分享给下载者：

   `https://github.com/kiss061012/jieya/releases/latest`

如果 `v1.0.0` 标签已存在，不要重复使用同一个标签；新版本请使用 `v1.0.1`、`v1.1.0` 等新标签。公开仓库的 Release 文件可供访问仓库的人下载。

## 文件结构

```text
desktop-app/
├─ main.js
├─ package.json
├─ src/
│  ├─ index.html
│  ├─ styles.css
│  └─ app.js
├─ sounds/                # 原项目音效
├─ assets/icon.ico        # Windows 图标
├─ 一键生成Windows安装包.bat
└─ 运行开发版.bat
```

## 说明

- 这是桌面版改造项目，不是把微信小程序文件改名为 `.exe`。
- 生成 Windows 安装包需要在 Windows 环境下构建，或使用仓库中的 GitHub Actions 自动构建工作流。
- 当前项目没有代码签名证书。Windows SmartScreen 可能对新发布、未签名的程序显示警告；用户应只从你分享的官方仓库下载。
