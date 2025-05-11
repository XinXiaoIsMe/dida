import { VueRouterMock, createRouterMock, injectRouterMock } from 'vue-router-mock'
import { config } from '@vue/test-utils'
import { beforeEach, vi } from 'vitest'

function setupRouterMock() {
  // createRouterMock也可以不传参，库内部做了类似处理
  // const router = createRouterMock()
  const router = createRouterMock({ // createRouterMock中，对router的push等方法进行了重写，实际就是使用了vi.fn进行了包装
    spy: {
      create(fn) {
        return vi.fn(fn)
      },
      // 这里spy就是create的返回值
      reset(spy) {
        return spy.mockClear()
      },
    },
  })
  beforeEach(() => {
    // 测试前重置router状态，否则后续测试中router状态不对，会报错
    router.reset()
    // 全局注入router信息，保证可以使用useRouter等，因为useRouter函数原理就是inject了router
    injectRouterMock(router)
  })
  // 下列函数完成类似const app = createApp(App); app.use(router);的功能，将router挂载到app上(app.router = router);
  config.plugins.VueWrapper.install(VueRouterMock)
}

setupRouterMock()
