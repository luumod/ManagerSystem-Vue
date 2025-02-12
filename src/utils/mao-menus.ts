import type { RouteRecordRaw } from 'vue-router';

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = [];
  //1. 读取router/main中所有的ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  });
  //2. 将加载的所有路由对象放在localRoutes数组中
  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }

  //3. 根据菜单去匹配正确的路由
  return localRoutes;
}

export function mapMenusToRoutes(menus: any[]) {
  const localRoutes = loadLocalRoutes();

  const routes: RouteRecordRaw[] = [];
  for (const menu of menus) {
    if (menu.children === undefined) {
      const route = localRoutes.find((item) => item.path === menu.url);
      if (route) {
        routes.push(route);
      }
    }
    if (menu.children) {
      for (const sub_menu of menu.children) {
        const route = localRoutes.find((item) => item.path === sub_menu.url);
        if (route) {
          routes.push(route);
        }
      }
    }
  }
  return routes;
}
