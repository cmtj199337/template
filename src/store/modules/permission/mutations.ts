import { MutationTree } from 'vuex'
import { PermissionState } from './state'
import { PermissionMutationType } from './mutation-types'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'
import { RemoteRoute } from '@/model/remoteRouteModel'

export type Mutations<S = PermissionState> = {
  [PermissionMutationType.SET_ROUTES](state: S, routes: RemoteRoute[]): void
}

export const mutations: MutationTree<PermissionState> & Mutations = {
  [PermissionMutationType.SET_ROUTES] (state: PermissionState, routes: RemoteRoute[]) {
    state.routes = constantRoutes.concat(routes as unknown as RouteRecordRaw[])
    state.dynamicRoutes = routes as unknown as RouteRecordRaw[]
  }

}
