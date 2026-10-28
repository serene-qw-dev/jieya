# 解压研究所桌面版：发布给所有人下载

已经把桌面版项目放在 `desktop-app` 文件夹，并附上 GitHub 自动构建工作流。这个压缩包可以解压到你现在的 `D:\小程序` 仓库目录中，不会覆盖原来小程序的 `app.js`、`app.json` 等文件。

## 推荐做法：让 GitHub 自动打包

### 1. 解压文件

把本压缩包中的内容解压到你当前的项目目录 `D:\小程序`，检查目录结构大致如下：

```text
D:\小程序\
├─ .git\                         # 你已有的 Git 仓库，不能删除
├─ .github\
│  └─ workflows\
│     └─ release-windows.yml      # 自动打包工作流
├─ desktop-app\                  # 新的 Windows 桌面版项目
│  ├─ package.json
│  ├─ main.js
│  ├─ src\
│  ├─ sounds\
│  └─ 一键生成Windows安装包.bat
├─ app.js                         # 原来的微信小程序文件，仍保留
└─ app.json                       # 原来的微信小程序文件，仍保留
```

**不要删除 `.git` 文件夹。** 解压时如提示合并 `.github` 文件夹，选择合并即可。桌面版项目在 `desktop-app` 子文件夹里，不会替换原来小程序根目录的同名文件。

### 2. 把新文件推送到 GitHub

打开 CMD，依次执行：

```cmd
cd /d D:\小程序
git add .
git commit -m "添加解压研究所 Windows 桌面版"
git push
```

如果 `git commit` 提示 `nothing to commit`，说明文件可能没有解压到仓库目录，或者已经提交过。先用 `git status` 检查。

### 3. 触发 Windows 安装包构建

接着执行：

```cmd
git tag v1.0.0
git push origin v1.0.0
```

标签 `v1.0.0` 会触发 GitHub Actions。打开仓库的 **Actions** 页面查看 `Build Windows release` 工作流。第一次构建需要下载依赖，因此 GitHub 会在线构建一段时间。

### 4. 获取下载链接

构建成功后，GitHub 会自动创建一个 Release，并把 `.exe` 安装程序与 `.zip` 便携包作为附件发布。你的仓库是公开仓库时，其他人即可访问：

**<https://github.com/kiss061012/jieya/releases/latest>**

以后发布新版本时使用新的标签，例如：

```cmd
git tag v1.0.1
git push origin v1.0.1
```

不要重复使用已经存在的版本标签。如果 Actions 失败，打开对应运行记录查看错误日志。

## 可选：先在自己电脑运行

1. 安装 Node.js 24 LTS：<https://nodejs.org/>
2. 进入 `D:\小程序\desktop-app`。
3. 双击 `一键生成Windows安装包.bat`。
4. 打包成功后会自动打开 `desktop-app\dist`，里面有 `.exe` 和 `.zip`。

本地打包首次需要联网安装 Electron 等依赖。Windows 可能对未签名的新软件显示 SmartScreen 提示，这是没有代码签名证书时可能出现的情况；建议下载者始终通过你的官方 GitHub Release 获取文件。

## 桌面版说明

这是根据你上传的小程序源码制作的 Electron 桌面版初稿，包含木鱼、捏泡泡、锤烦恼、每日求签、个人统计和音效开关。桌面版记录保存在使用者本机，不会自动同步微信小程序的数据。求签结果仅供娱乐。
