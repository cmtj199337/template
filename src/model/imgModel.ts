export interface SmsModel {
    img: string
    uuid: string
}

export interface ListTypeFace<T> {
    total: any
    rows: T
}

export interface ConfigForm {
    remark: string
    configType: string
    configValue: string
    configKey: string
    configName: string
}

export interface ConfigModel {
    code: number
    total: number
    rows: []
  }
