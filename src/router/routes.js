/**
 * @Description:    路由列表
 * @Author:         TSY
 * @Email:          t@tsy6.com
 * @CreateDate:     2019/3/31 11:56
 */

//首页
const index = (r) =>
  require.ensure([], () => r(require("../views/index")), "index");

export const routes = [{ path: "/", name: "index", component: index }];
