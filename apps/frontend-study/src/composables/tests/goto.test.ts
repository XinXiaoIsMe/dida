import { useRouter } from 'vue-router'
import { useGoto } from '../goto'
import { RouteNames } from '@/router/const'

vi.mock('vue-router')
const pushFn = vi.fn()
vi.mocked(useRouter as any).mockImplementation(() => {
  return {
    push: pushFn,
  }
})
describe('useGoto', () => {
  const { gotoHome, gotoSettings } = useGoto()

  beforeEach(() => {
    pushFn.mockClear()
  })

  it('should go to home', () => {
    gotoHome()
    expect(pushFn).toHaveBeenCalledWith({
      name: RouteNames.HOME,
    })
  })

  it('should go to settings', () => {
    gotoSettings()
    expect(pushFn).toHaveBeenCalledWith({
      name: RouteNames.SETTINGS,
    })
  })
})
