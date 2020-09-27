interface ISettings {
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
	title:string,
	//token名称
  tokenName: string,
  //token存储位置localStorage sessionStorage cookie
  storage: string,
  //是否显示logo，不显示时设置false，显示时请填写svgIcon图标名称
  logo: string | boolean,
}

// You can customize below settings :)
const settings: ISettings = {
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
	title: "vue-ts-admin",
  //token名称
  tokenName: "accessToken",
  //token存储位置localStorage sessionStorage cookie
  storage: "localStorage",
  logo: "Vue",
}

export default settings