import { Component } from '@/@types/types'
export interface Meta {
  title: string
  icon: string
}

export interface Children {
  id: number
  parentId: number
  path: string
  component: string
  name: string
  num: number
  hidden: boolean
  meta: Meta
  children: any[]
}

export interface RemoteRoute {
  id: number
  parentId: number
  path: string
  component: string | Component
  name: string
  num: number
  hidden: boolean
  meta: Meta
  children: Children[]
}
