/*
 * @Description: 自定义配置
 */

import { NetworkConfig } from './default/net.config'
import { Theme } from './default/theme.config'
import { Settings } from './default/setting.config'

type CustomConfig = NetworkConfig  & Theme & Settings

const customConfig: CustomConfig = {

}

export default customConfig
