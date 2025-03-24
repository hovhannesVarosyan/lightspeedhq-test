import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export default async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {

  if (to.path === '/') {
    next('/categories');
  } else {
    next();
  }
};
