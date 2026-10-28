# 解压研究所 v1.1.0 — GitHub 升级与发布步骤

这个 ZIP 是给你现有的 `kiss061012/jieya` 仓库用的，包含 `desktop-app` 新版本文件和 GitHub Actions 自动构建配置。它不是已经编译好的 EXE。

## 1. 备份和覆盖文件

1. 先备份电脑上的 `D:\小程序` 文件夹。
2. 将这个 ZIP 解压到 `D:\小程序`，让里面的 `desktop-app` 文件夹覆盖旧的 `desktop-app`，`.github` 文件夹也合并到仓库根目录。
3. **不要删除** `D:\小程序\.git`。它是 Git 仓库信息。
4. 检查路径是否正确：
   - `D:\小程序\desktop-app\package.json`
   - `D:\小程序\desktop-app\src\app.js`
   - `D:\小程序\.github\workflows\release-windows.yml`

## 2. 提交新代码

打开 CMD，逐条执行，每行按一次回车：

```cmd
cd /d D:\小程序
git status
git add desktop-app .github/workflows/release-windows.yml
git commit -m "发布解压研究所 v1.1.0"
git push
```

如果 `git commit` 显示 `nothing to commit`，先确认 ZIP 确实解压覆盖到了正确路径。

## 3. 触发 Windows 安装包构建

确认代码推送成功后，继续逐条执行：

```cmd
git tag v1.1.0
git push origin v1.1.0
```

如果 `v1.1.0` 标签已经存在，不要重复创建；改用 `v1.1.1`，并把 `desktop-app/package.json` 里的版本号也改成 `1.1.1` 后提交。

## 4. 等待 GitHub 发布成功

打开：<https://github.com/kiss061012/jieya/actions>

找到 `Build Windows release`，确认任务状态为成功。工作流会在 Windows runner 上安装依赖、构建安装程序，并将下列文件附加到 v1.1.0 Release：

- `解压研究所-1.1.0-Windows-x64.exe` — Windows 安装程序
- `解压研究所-1.1.0-Windows-x64.zip` — 便携包

发布页：<https://github.com/kiss061012/jieya/releases/latest>

## 5. 也可以在 Windows 本机运行或打包

安装 Node.js 24 LTS：<https://nodejs.org/>。进入 `D:\小程序\desktop-app`：

```cmd
npm install
npm start
```

确认软件可运行后生成安装包：

```cmd
npm run dist:win
```

安装包会放在 `desktop-app\dist`。

## 版本内容

保留原有木鱼、限时捏泡泡、锤烦恼、每日求签、档案和成就，并新增：
- 雨声、海浪、森林环境音与全屏放松模式；
- 沙子绘画、彩砂颜色/颗粒大小调节及 PNG 导出；
- 无限捏泡泡；
- 四种主题、游戏音效开关和音量；
- 每日心情选择、文字日记、月历和每周回顾。

心情与统计默认保存在本地，不会自动上传。白噪音是本机实时合成的氛围音，并非自然环境录音。
