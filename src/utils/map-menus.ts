import type { RouteRecordRaw } from 'vue-router';

/**
 * 从router/main文件夹中读取全部路由对象
 * @returns 全部路由对象数组
 */
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

  return localRoutes;
}

/**
 * 第一个菜单项
 * {
 *   "children": null,
 *   "id": 2,
 *   "name": "系统概况",
 *  "parentId": 1,
 *   "sort": 101,
 *   "type": 2,
 *   "url": "/main/home/overview"}
 */
export let first_menu: any = null;

/**
 * 当前激活的菜单项（使得刷新页面后菜单项的选中状态不会丢失）
 */
export let active_menu: any = null;

/**
 * 实现动态路由：【递归】根据当前菜单项匹配到对应路由
 * @param menus 菜单项数组
 * @returns 匹配到的路由对象
 */
export function mapMenusToRoutes(menus: any[]) {
  const localRoutes = loadLocalRoutes();
  const routes: RouteRecordRaw[] = [];

  // 递归处理子菜单项
  function traverseSubMenus(menu: any) {
    if (menu.children) {
      for (const subMenu of menu.children) {
        const route = localRoutes.find((item) => item.path === subMenu.url);
        if (route) {
          //1. 顶层菜单项重定向为其第一个子菜单项
          if (!routes.find((item) => item.path === menu.url)) {
            routes.push({ path: menu.url, redirect: route.path });
          }
          routes.push(route);

          //2. 获取第一个菜单项（用于最开始显示的页面）
          if (!first_menu) {
            first_menu = subMenu;
          }
        }
        // 递归处理子菜单的子菜单
        traverseSubMenus(subMenu);
      }
    }
  }

  // 遍历所有顶层菜单项，处理它们的子菜单
  for (const menu of menus) {
    if (!menu.children) {
      //第一层菜单项没有子菜单
      const route = localRoutes.find((item) => item.path === menu.url);
      if (route) {
        routes.push(route);
        if (!first_menu) {
          first_menu = menu;
        }
        continue;
      }
    }
    traverseSubMenus(menu);
  }

  // console.log('first_menu', first_menu);
  // console.log('routes', routes);

  return routes;
}

/**
 * 根据当前路径匹配到对应的菜单项：用于保持刷新页面后菜单项的选中状态不变
 * @param path 需要匹配的路径
 * @param user_menus 所有的菜单项
 * 无返回值，利用active_menu变量保存当前激活的菜单项
 */
export function mapPathToMenu(path: string, user_menus: any[]) {
  function traverseSubMenus(menu: any) {
    if (menu.children) {
      for (const subMenu of menu.children) {
        if (subMenu.url === path) {
          active_menu = subMenu;
        }
        traverseSubMenus(subMenu);
      }
    }
  }

  // 遍历所有顶层菜单项，处理它们的子菜单
  for (const menu of user_menus) {
    if (!menu.children) {
      if (menu.url === path) {
        active_menu = menu;
      }
    }
    traverseSubMenus(menu);
  }
}

interface IBreadcrumb {
  name: string;
  path: string;
}

/**
 * 匹配路径到面包屑：用于显示当前页面的路径导航
 * @param path 当前路径
 * @param user_menus 菜单项
 * @returns
 */
export function mapPathToBreadcrumbs(path: string, user_menus: any[]) {
  const bread_crumbs: IBreadcrumb[] = [];
  function traverseSubMenus(menu: any) {
    if (menu.children) {
      for (const subMenu of menu.children) {
        if (subMenu.url === path) {
          bread_crumbs.push({ name: menu.name, path: menu.url });
          bread_crumbs.push({ name: subMenu.name, path: subMenu.url });
        }
        traverseSubMenus(subMenu);
      }
    }
  }

  for (const menu of user_menus) {
    if (!menu.children) {
      if (menu.url === path) {
        bread_crumbs.push({ name: menu.name, path: menu.url });
      }
    }
    traverseSubMenus(menu);
  }
  return bread_crumbs;
}
