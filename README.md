# vscode-sound-player

## 描述

本插件用于在 vscode 环境中播放对应文件音频

## 功能

- 播放/停止

## 技术点

- webview 端使用[React](https://react.docschina.org/languages)
- webview 端使用[audio-file-decoder](https://github.com/aeroheim/audio-file-decoder)解码

## 问题

`audio-file-decoder`在解码多声道音频时会只有单声道的数据且似乎有几率有问题

## 额外

如果你有知道有其他 nodejs 端进行音频解码的库，欢迎给我提[issue](https://github.com/asurance/vscode-sound-player/issues)好继续开发。
对库的要求是能获取到音频的采样率，采样帧数，通道数和每个通道内的音频数据。

## 提示

如果你也在开发 vscode 的插件，并且发现其 webview 无法播放声音，那么这边有一种途径是可行的(也就是本插件正在使用的)。extension 端对音频进行解码传给 webview 端，webview 端使用`audio context`api 进行声音播放。
