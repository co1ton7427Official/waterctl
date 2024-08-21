interface ErrorCase {
  isHit: (msg: string) => boolean;
  output: (container: HTMLElement, error: unknown) => void;
  isFatal: boolean;
  showLogs: boolean;
}

const errorCases: ErrorCase[] = [
  {
    isHit: (msg) => !!msg.match(/WATERCTL INTERNAL Unknown RXD data/),
    output: (container) => {
      container.innerText = "接收到未知数据。可能不影响使用。\n\n这可能是一个 Bug，请截图并";
      container.innerHTML += "<a href='https://github.com/celesWuff/waterctl' target='_blank'>反馈给开发者</a>。";
    },
    isFatal: false,
    showLogs: true,
  },
  {
    isHit: (msg) => !!msg.match(/WATERCTL INTERNAL Refused/) || !!msg.match(/WATERCTL INTERNAL Bad key/),
    output: (container) => {
      container.innerText =
        "水控器拒绝启动。\n\n" +
        "蓝牙水控器 FOSS 当前不支持您的水控器，请不要重试，多次失败可能造成水控器锁定。\n" +
        "若发生锁定，水控器将拒绝一切传入连接；在通电状态下等待约一小时方可恢复。\n\n" +
        "请截图并";
      container.innerHTML += "<a href='https://github.com/celesWuff/waterctl' target='_blank'>反馈给开发者</a>。";
    },
    isFatal: true,
    showLogs: true,
  },
  {
    isHit: (msg) => !!msg.match(/WATERCTL INTERNAL Operation timed out/),
    output: (container) => {
      container.innerText = "等待时间似乎太长了。\n\n如果该问题反复发生，这可能是一个 Bug，请截图并";
      container.innerHTML += "<a href='https://github.com/celesWuff/waterctl' target='_blank'>反馈给开发者</a>。";
    },
    isFatal: false,
    showLogs: true,
  },
  {
    isHit: (msg) => !!msg.match(/User denied the browser permission/),
    output: (container) => {
      container.innerText = "蓝牙权限遭拒。\n\n请前往手机设置，授予浏览器“位置信息”权限。\n此权限不会用于定位，详情请参考源代码仓库内的";
      container.innerHTML += "<a href='https://github.com/celesWuff/waterctl/blob/gh-pages/FAQ.md' target='_blank'>“疑难解答”</a>。";
    },
    isFatal: true,
    showLogs: false,
  },
  {
    isHit: (msg) => !!msg.match(/NetworkError/),
    output: (container) => {
      container.innerText = "连接不稳定，无法与水控器建立连接。\n请重试。";
    },
    isFatal: true,
    showLogs: false,
  },
  {
    isHit: (msg) => !navigator.bluetooth || !!msg.match(/Bluetooth adapter not available/) || !!msg.match(/NotFoundError/),
    output: (container) => {
      container.innerText = "不支持的浏览器。\n\n需要支持蓝牙的浏览器，如 Chrome 或 Edge。\n\n";
      container.innerHTML += "<a href='https://github.com/celesWuff/waterctl/blob/gh-pages/FAQ.md' target='_blank'>查看支持列表</a>。";
    },
    isFatal: true,
    showLogs: false,
  },
  {
    isHit: () => true,
    output: (container, error) => {
      container.innerText = error + "\n\n是什么呢\n\n（这可能是一个 Bug，请截图并";
      container.innerHTML += "<a href='https://github.com/celesWuff/waterctl' target='_blank'>反馈给开发者</a>。）";
    },
    isFatal: true,
    showLogs: true,
  },
];

export function resolveError(error: unknown): ErrorCase {
  for (const c of errorCases) {
    if (c.isHit(error!.toString())) {
      return c;
    }
  }

  throw new Error(`WATERCTL INTERNAL Unhandled: ${error}`);
}
