// {
//     "code": 0,
//     "msg": "success",
//     "data": {
//         "accessToken": "admin-token"
//     }
// }

export interface LoginModel {
  token: string
  code: number | string
  msg: string
}
