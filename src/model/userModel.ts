export interface UserInfoModel <T> {
  code: number
  permissions: string[]
  roles: string[]
  user: T
}

export interface UserDesc {
  admin: boolean
  avatar: string
  createBy: string
  dept: any
  deptId: number
  email: string
  nickName: string
  phonenumber: string
  postIds: any
  remark: string
  userName: string
}

export interface Users{
  items: any
}
