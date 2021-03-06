import {
  Async,
  Scope,
  ScopeEnum,
  Autowire,
  Init,
  Destroy,
  getObjectDefProps,
} from '../../src';

@Async()
@Scope(ScopeEnum.Prototype)
@Autowire(false)
class Test {
  @Init()
  init() {}

  @Destroy()
  destroy() {}
}

@Scope()
@Autowire()
class TestOne {}

describe('/test/annotation/objectDef.test.ts', () => {
  it('objectDef decorator should be ok', () => {
    const def = getObjectDefProps(Test);
    expect(def).toStrictEqual({
      isAutowire: false,
      scope: ScopeEnum.Prototype,
      initMethod: 'init',
      destroyMethod: 'destroy',
      isAsync: true,
    });

    const defone = getObjectDefProps(TestOne);
    expect(defone).toStrictEqual({
      isAutowire: true,
      scope: ScopeEnum.Singleton,
    });
  });
});
