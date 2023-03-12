/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 全局变量配置
 */
  // 开发以及部署时的URL
  export const publicPath = "";
  // 生产环境构建文件的目录名
  export const outputDir = "dist";
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  export const assetsDir = "static";
  // 开发环境每次保存时是否输出为eslint编译警告
  export const lintOnSave = false;
  // 进行编译的依赖
  export const transpileDependencies = [
    "vue-echarts",
    "resize-detector",
    "zx-layouts",
  ];
  // 默认的接口地址 如果是开发环境和生产环境走vab-mock-server，当然你也可以选择自己配置成需要的接口地址
  export const baseOpsTestUrl = "/ops-test";
  export const baseURL = "";
  // process.env.NODE_ENV === "development"
  //   ? "http://127.0.0.1:7000/opsli-boot"
  //   ="/opsli-boot"
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  export const title = "宇宙无敌螺旋升天式OPS平台";
  //简写
  export const abbreviation = "opsli";
  //开发环境端口号
  export const devPort = "80";
  //版本号
  export const version = process.env.VUE_APP_VERSION;
  //烦请保留package.json作者信息 保留版权可免费商用 如需去除并自定义为自己企业的版权请联系群主QQ 1204505056 需支付299元 恶意修改发生纠纷及出现任何问题 由修改人自行承担
  export const copyright = process.env.VUE_APP_AUTHOR;
  //是否显示页面底部版权信息，建议您显示，当然您也可以选择不显示，不管您是付费用户还是未付费用户您都有选择显示或者不显示的权利
  export const footerCopyright = false;
  //是否显示右上角github图标
  export const githubCorner = false;
  //是否显示顶部进度条
  export const progressBar = true;
  //缓存路由的最大数量
  export const keepAliveMaxNum = 99;
  // 路由模式，可选值为 history 或 hash
  export const routerMode = "hash";
  //不经过token校验的路由
  export const routesWhiteList = [
    "/demo",
    "/login",
    "/register",
    "/404",
    "/401",
  ];
  //加载时显示文字
  export const loadingText = "正在加载中...";
  //token名称
  export const tokenName = "group";
  //token在localStorage、sessionStorage、cookie存储的key的名称
  export const tokenTableName = "group";
  //token存储位置localStorage sessionStorage cookie
  export const storage = "cookie";
  //token失效回退到登录页时是否记录本次的路由
  export const recordRoute = true;
  //是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon
  export const logo = "opsli";
  //是否国定头部 固定fixed 不固定noFixed
  export const header = "fixed";
  //横纵布局 horizontal vertical
  export const layout = "vertical";
  //是否开启主题配置按钮
  export const themeBar = false;
  //是否显示多标签页
  export const tagsBar = true;
  //是否显示骨架屏
  export const skeleton = false;
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  export const contentType = "application/json;charset=UTF-8";
  //消息框消失时间
  export const messageDuration = 3000;
  //最长请求时间 可能会有导入 会有较长时间损耗 这里暂时设定失效时间为20秒
  export const requestTimeout = 5000;
  //操作正常code，支持String、Array、int多种类型
  export const successCode = [200, 201, 0];
  //登录失效code
  export const invalidCode = 402;
  //行锁更新异常code
  export const rowLockCode = 10100;
  //无权限code
  export const noPermissionCode = 401;
  //是否显示在页面高亮错误 生产环境不需要显示 errorLog
  export const errorLog = ["development", "test"];
  //是否开启登录拦截
  export const loginInterception = true;
  //是否开启登录RSA加密
  export const loginRSA = false;
  //是否依据mock数据生成webstorm HTTP Request请求文件
  export const httpRequestFile = false;
  //intelligence和all两种方式，前者后端权限只控制permissions不控制view文件的import（前后端配合，减轻后端工作量），all方式完全交给后端前端只负责加载
  export const authentication = "all";
  //vertical布局时是否只保持一个子菜单的展开
  export const uniqueOpened = true;
  //vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个
  export const defaultOopeneds = ["/deve"];
  //需要加loading层的请求，防止重复提交
  export const debounce = ["insert", "update", "delete"];
  //需要自动注入并加载的模块
  export const providePlugin = {
    maptalks: "maptalks",
    "window.maptalks": "maptalks",
  };
  //npm run build时是否自动生成7z压缩包
  export const build7z = false;
  //代码生成机生成在view下的文件夹名称
  export const templateFolder = "project";
  //是否显示终端donation打印
  export const donation = false;
