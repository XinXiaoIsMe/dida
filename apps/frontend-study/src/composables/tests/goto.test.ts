// import { useRouter } from 'vue-router'
// import { VueRouterMock, createRouterMock, injectRouterMock } from 'vue-router-mock'
// import { config, mount } from '@vue/test-utils'
// import { mount } from '@vue/test-utils'
import { useGoto } from '../goto'
import { RouteNames } from '@/router/const'
import { useSetup } from '@/tests/helpers'

// 方法1：手动mock
// vi.mock('vue-router')
// const pushFn = vi.fn()
// vi.mocked(useRouter as any).mockImplementation(() => {
//   return {
//     push: pushFn,
//   }
// })
// describe('useGoto', () => {
//   const { gotoHome, gotoSettings } = useGoto()

//   beforeEach(() => {
//     pushFn.mockClear()
//   })

//   it('should go to home', () => {
//     gotoHome()
//     expect(pushFn).toHaveBeenCalledWith({
//       name: RouteNames.HOME,
//     })
//   })

//   it('should go to settings', () => {
//     gotoSettings()
//     expect(pushFn).toHaveBeenCalledWith({
//       name: RouteNames.SETTINGS,
//     })
//   })
// })

// 方法2：使用vue-router-mock库
// createRouterMock也可以不传参，库内部做了类似处理
// const router = createRouterMock()
// const router = createRouterMock({ // createRouterMock中，对router的push等方法进行了重写，实际就是使用了vi.fn进行了包装
//   spy: {
//     create(fn) {
//       return vi.fn(fn)
//     },
//     // 这里spy就是create的返回值
//     reset(spy) {
//       return spy.mockClear()
//     },
//   },
// })
// beforeEach(() => {
//   // 测试前重置router状态，否则第二个测试中router状态不对，会报错
//   router.reset()
//   // 全局注入router信息，保证可以使用useRoute等，因为useRouter函数原理就是inject了router
//   injectRouterMock(router)
// })
// // 下列函数完成类似const app = createApp(App); app.use(router);的功能，将router挂载到app上(app.router = router);
// config.plugins.VueWrapper.install(VueRouterMock)

// 优化：将router的配置放在vites.setup.ts中，挂载组件的逻辑抽离出来

describe('useGoto', () => {
  it('should go to home page', () => {
    // // 手动构建一个组件，模拟useGoto的使用场景
    // const Comp = {
    //   setup() {
    //     const { gotoHome } = useGoto()
    //     gotoHome()
    //   },
    //   // 必须添加render
    //   render() {},
    // }
    // // 挂载组件
    // const wrapper = mount(Comp)
    const { router } = useSetup(() => {
      const { gotoHome } = useGoto()
      gotoHome()
    })
    expect(router.push).toHaveBeenCalledWith({
      name: RouteNames.HOME,
    })
  })

  it('should go to settings page', () => {
    // const Comp = {
    //   setup() {
    //     const { gotoSettings } = useGoto()
    //     gotoSettings()
    //   },
    //   render() {},
    // }
    // const wrapper = mount(Comp)
    // expect(wrapper.router.push).toHaveBeenCalledWith({
    //   name: RouteNames.SETTINGS,
    // })

    const { router } = useSetup(() => {
      const { gotoSettings } = useGoto()
      gotoSettings()
    })
    expect(router.push).toHaveBeenCalledWith({
      name: RouteNames.SETTINGS,
    })
  })
})
