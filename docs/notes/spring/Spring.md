## 1. Spring Bean 容器是什么

* Spring 定义的用于存放与管理对象的配置、生命周期与依赖的容器
* 配置：单例还是多例
* 生命周期：统一的流程，实例化、属性填充、初始化、业务使用、销毁
* 依赖：生命周期的属性填充


## 2. Spring Bean 容器流程

* 基础流程
* 定义：接口 BeanDefinition、接口 BeanFactory
    * BeanDefinition：定义 Bean 的实例信息的接口
* 注册：对象的 id 与地址存放到 HashMap
    * BeanFactory：注册与获取 Bean 的**根接口**
* 获取：根据 id 获取 HashMap 的对象地址
    * BeanFactory：注册与获取 Bean 的**根接口**
![在这里插入图片描述](https://img-blog.csdnimg.cn/7357d6d4a82f466a860875d0c022007e.jpeg#pic_center)




### 1. 核心抽象类 AbstractBeanFactory

1.  抽象类 AbstractBeanFactory 实现了 getBean 方法：获取 Bean 对象
    * BeanFactory 接口定义了 getBean 方法
    * 抽象类 AbstractBeanFactory 使用了模板方法模式
2.  实现类 DefaultSingletonBeanRegistry 实现了 getSingleton 方法：获取单例 Bean 对象
    * SingletonBeanRegistry 接口定义了 getSingleton 方法
3.  实现类 DefaultSingletonBeanRegistry 实现了 addSingleton(String beanName, Object singletonObject) 方法：注册单例 Bean 对象
    * 他自己定义的 addSingleton 方法

Spring 源码：
![在这里插入图片描述](https://img-blog.csdnimg.cn/19f9fe32086a4472822e1e93f9a4f336.png#pic_center)

### 2. 核心实现类 DefaultListableBeanFactory

1.  抽象类 AbstractAutowireCapableBeanFactory 实现了 createBean(String beanName, BeanDefinition beanDefinition) 方法：创建 Bean 对象
    * 依赖了 BeanDefinition 接口
    * 抽象类 AbstractBeanFactory 定义了 createBean(String beanName, BeanDefinition beanDefinition) 方法
2.  实现类 DefaultListableBeanFactory 实现了 getBeanDefinition(String beanName) 方法：获取 BeanDefinition 对象的
    * 依赖了 BeanDefinition 接口
    * 抽象类 AbstractBeanFactory 定义了 getBeanDefinition(String beanName) 方法
3.  实现类 DefaultListableBeanFactory 实现了 registerBeanDefinition(String beanName, BeanDefinition beanDefinition) 方法：注册 BeanDefinition 对象
    * 接口 BeanDefinitionRegistry 定义了 registerBeanDefinition(String beanName, BeanDefinition beanDefinition) 方法

Spring 源码：
![在这里插入图片描述](https://img-blog.csdnimg.cn/6d42463a9b8c486c95c5270a25aa9845.png#pic_center)

### 3. 核心接口 InstantiationStrategy

* 抽象类 AbstractAutowireCapableBeanFactory 定义：使用 JDK 还是 Cglib 实例化带参 Bean 对象
* 核心接口 InstantiationStrategy 定义：instantiate(BeanDefinition beanDefinition, String beanName, Constructor ctor, Object\[] args) throws BeansException; 实例化对象、无论是否带参
	* 策略模式，根据传入参数自动选择哪个算法模板
* 实现类 SimpleInstantiationStrategy 实现：instantiate 方法，使用 JDK 反射创建 Bean 对象（无论是否带参）
* 实现类 CglibSubclassingInstantiationStrategy 实现：instantiate 方法，使用 Cglib 代理实例化 Bean 对象（无论是否带参）
	* Cglib 代理是一种代理模式，此外还有 Proxy 的动态代理，直接使用的静态代理
	* Cglib 代理是基于字节码框架 ASM 实现
	* net.sf.cglib.proxy.NoOp：在 Cglib 使用回调时把方法调用直接委派到父类实现（或者说传入对象直接调用方法）


### 4. 核心实现类 AbstractAutowireCapableBeanFactory

* 实现类 PropertyValue 定义了：Bean 对象的属性名与与数据
* 实现类 PropertyValues 封装了：PropertyValue
* 实现类 BeanDefinition 定义了：注入的属性类 PropertyValues
* 实现类 AbstractAutowireCapableBeanFactory 实现了：在创建 Bean 对象后注入依赖  applyPropertyValues 的方法
* 工具类 BeanReference 定义了：它在依赖注入时属于一个 Bean 对象
* 注意此时并未考虑循环依赖的问题

### 5. 总结

* 总结：
	* 系统设计通常是通过接口、抽象类、继承与实现，隔离类的功能职责和作用范围
	* Spring 内部将 Bean 对象拆分放入 BeanDefinition，方便统一管理


## 3. 我的代码结构与源码

### 1. 我的调用类图（模拟 Spring 源码）

![在这里插入图片描述](https://img-blog.csdnimg.cn/2cab4a872393435594970c3d9ce4b835.png#pic_center)



### 2. 我的代码结构（模拟 Spring 源码）
```
.
└── beans
    ├── BeansException.java
    ├── PropertyValue.java
    ├── PropertyValues.java
    └── factory
        ├── BeanFactory.java
        ├── config
        │   ├── BeanDefinition.java
        │   ├── BeanReference.java
        │   └── SingletonBeanRegistry.java
        └── support
            ├── AbstractAutowireCapableBeanFactory.java
            ├── AbstractBeanFactory.java
            ├── BeanDefinitionRegistry.java
            ├── CglibSubclassingInstantiationStrategy.java
            ├── DefaultListableBeanFactory.java
            ├── DefaultSingletonBeanRegistry.java
            ├── InstantiationStrategy.java
            └── SimpleInstantiationStrategy.java
.
└── test
    ├── ApiTest.java
    └── bean
        ├── UserController.java
        ├── UserDao.java
        └── UserService.java
```


### 3. 源码

#### 1. BeanFactory 接口定义获取 Bean 对象

```java
/**
 * 核心接口：定义获取 Bean 对象
 * @author gusixue
 * @date 2023/3/26
 */
public interface BeanFactory {

    Object getBean(String beanName) throws BeansException;

    Object getBean(String beanName, Object... args) throws BeansException;

}
```


#### 2. AbstractBeanFactory 抽象类

```java
/**
 * 核心抽象类：实现获取 Bean 对象、定义获取 BeanDefinition 对象、定义创建 Bean 对象
 * @author gusixue
 * @date 2023/3/26
 */
public abstract class AbstractBeanFactory extends DefaultSingletonBeanRegistry implements BeanFactory {

    /**
     * 获取无参 Bean 对象
     * @param beanName Bean 对象唯一 id
     * @return 返回创建好的 Bean 对象
     * @throws BeansException 创建 Bean 对象失败
     */
    @Override
    public Object getBean(String beanName) throws BeansException {
        Object bean = getSingletonBean(beanName);
        if (null != bean) {
            return bean;
        }

        BeanDefinition beanDefinition = getBeanDefinition(beanName);

        return createBean(beanName, beanDefinition, null);
    }

    /**
     * 获取有参 Bean 对象
     * @param beanName Bean 对象唯一 id
     * @param args Bean 对象参数
     * @return 返回创建好的有参 Bean 对象
     * @throws BeansException 创建 Bean 对象失败
     */
    @Override
    public Object getBean(String beanName, Object... args) throws BeansException {
        Object bean = getSingletonBean(beanName);
        if (null != bean) {
            return bean;
        }

        BeanDefinition beanDefinition = getBeanDefinition(beanName);
        return createBean(beanName, beanDefinition, args);
    }

    protected abstract BeanDefinition getBeanDefinition(String beanName) throws BeansException;

    protected abstract Object createBean(String beanName, BeanDefinition beanDefinition, Object... args) throws BeansException;
}
```


#### 3. DefaultSingletonBeanRegistry 定义单例对象

```java
/**
 * 实现：获取单例 Bean 对象、注册单例 Bean 对象
 * @author gusixue
 * @date 2023/3/26
 */
public class DefaultSingletonBeanRegistry implements SingletonBeanRegistry {

    // 缓存 Bean 对象唯一 id 和单例 Bean 对象的容器
    private Map<String, Object> singletonBeanMap = new HashMap<>();

    /**
     * 获取单例 Bean 对象
     * @param beanName Bean 对象唯一 id
     * @return 返回单例 Bean 对象
     */
    @Override
    public Object getSingletonBean(String beanName) {
        return singletonBeanMap.get(beanName);
    }

    /**
     * 注册单例 Bean 对象
     * @param beanName Bean 对象唯一 id
     * @param singletonBean 单例 Bean 对象
     */
    protected void addSingleBean(String beanName, Object singletonBean) {
        singletonBeanMap.put(beanName, singletonBean);
    }
}
```


#### 4. AbstractAutowireCapableBeanFactory 核心抽象类，创建对象核心

```java
/**
 * 实现：创建 Bean 对象，依赖注入（暂未考虑循环依赖）
 * @author gusixue
 * @date 2023/3/26
 */
public abstract class AbstractAutowireCapableBeanFactory extends AbstractBeanFactory {

    // 使用 JDK 进行 Bean 对象的实例化
//    InstantiationStrategy instantiationStrategy = new SimpleInstantiationStrategy();

    // 使用 Cglib 进行 Bean 对象的实例化
    InstantiationStrategy instantiationStrategy = new CglibSubclassingInstantiationStrategy();

    /**
     * 创建 Bean 对象并进行依赖注入
     * @param beanName Bean 对象唯一 id
     * @param beanDefinition 解耦封装 Bean 对象
     * @param args Bean 对象参数
     * @return 返回已经创建好的 Bean 对象
     * @throws BeansException 创建 Bean 对象失败或者依赖注入失败
     */
    @Override
    protected Object createBean(String beanName, BeanDefinition beanDefinition, Object... args) throws BeansException {
        Object bean = null;

        try {
            bean = createBeanInstance(beanName, beanDefinition, args);

            applyPropertyValues(beanName, bean, beanDefinition);
        } catch (Exception e) {
            throw new BeansException("Instantiation of bean failed", e);
        }

        addSingleBean(beanName, bean);
        return bean;
    }

    /**
     * 选择正确的构造器，通过策略类创建 Bean 对象
     * @param beanName Bean 对象唯一 id
     * @param beanDefinition 解耦封装 Bean 对象
     * @param args Bean 对象参数
     * @return 返回已经创建好的 Bean 对象
     */
    private Object createBeanInstance(String beanName, BeanDefinition beanDefinition, Object[] args) {
        Constructor ctor = null;
        Constructor<?>[] constructors = beanDefinition.getBeanClass().getConstructors();
        /**
         * 简化：根据传入参数选择最匹配的构造器
         * Spring 实际会使用这个：getBean 传入参数与 BeanDefinition 中所有构造器权重相差最小的就使用那个构造器
         * int typeDiffWeight = (mbd.isLenientConstructorResolution() ?
         * 						argsHolder.getTypeDifferenceWeight(paramTypes) : argsHolder.getAssignabilityWeight(paramTypes));
         */
        if (null != args) {
            for (Constructor constructor : constructors) {
                if (null != constructor && constructor.getParameterCount() == args.length) {
                    ctor = constructor;
                    break;
                }
            }
        }

        return instantiationStrategy.instantiate(beanName, beanDefinition, ctor, args);
    }

    /**
     * Bean 对象进行依赖注入
     * @param beanName Bean 对象唯一 id
     * @param bean 创建好的 Bean 对象
     * @param beanDefinition 解耦封装 Bean 对象
     */
    private void applyPropertyValues(String beanName, Object bean, BeanDefinition beanDefinition) {

        PropertyValues propertyValues = beanDefinition.getPropertyValues();
        if (propertyValues != null && propertyValues.getPropertyValues() != null
                && propertyValues.getPropertyValues().size() > 0) {

            for (PropertyValue propertyValue : propertyValues.getPropertyValues()) {

                String propertyName = propertyValue.getName();
                Object propertyValueObj = propertyValue.getValue();

                if (propertyValueObj instanceof BeanReference) {

                    BeanReference beanReference = (BeanReference)propertyValueObj;
                    /**
                     * 注意这儿为了方便获取 Bean 对象没有加参数
                     * 注意 beanReference.getPropertyName() 可能与 propertyName 不一致，propertyName 方法与 setXxx 参数是一致的
                     */
                    propertyValueObj = getBean(beanReference.getPropertyName());
                }

                // 直接反射未考虑 Cglib 代理的 Bean 对象，set 方法内部是基本数据类型
//                String setMethodName = "set" + propertyName.substring(0, 1).toUpperCase() + propertyName.substring(1);
//                bean.getClass().getMethod(setMethodName, propertyValueObj.getClass())
//                        .invoke(bean, propertyValueObj);

                BeanUtil.setFieldValue(bean, propertyName, propertyValueObj);
            }
        }
    }


    public InstantiationStrategy getInstantiationStrategy() {
        return instantiationStrategy;
    }

    public void setInstantiationStrategy(InstantiationStrategy instantiationStrategy) {
        this.instantiationStrategy = instantiationStrategy;
    }
}
```


#### 5. DefaultListableBeanFactory 最终核心使用实现类

```java
/**
 * 核心实现类：实现类获取 BeanDefinition 对象、注册 BeanDefinition 对象
 * @author gusixue
 * @date 2023/3/26
 */
public class DefaultListableBeanFactory extends AbstractAutowireCapableBeanFactory implements BeanDefinitionRegistry{

    // 缓存 Bean 对象唯一 id 和 BeanDefinition 对象的容器
    private Map<String, BeanDefinition> beanDefinitionMap = new HashMap<>();

    /**
     * 获取 BeanDefinition 对象
     * @param beanName Bean 对象唯一 id
     * @return 返回 BeanDefinition 对象
     * @throws BeansException 获取不到 BeanDefinition 对象
     */
    @Override
    protected BeanDefinition getBeanDefinition(String beanName) throws BeansException {
        BeanDefinition beanDefinition = beanDefinitionMap.get(beanName);
        if (beanDefinition == null) {
            throw new BeansException("No bean named '" + beanName + "' is defined");
        }
        return beanDefinition;
    }

    /**
     * 注册 BeanDefinition 对象
     * @param beanName Bean 对象唯一 id
     * @param beanDefinition BeanDefinition 对象
     */
    @Override
    public void registerBeanDefinition(String beanName, BeanDefinition beanDefinition) {
        beanDefinitionMap.put(beanName, beanDefinition);
    }
}
```


#### 6. BeanDefinition 实现类，解耦 Bean 对象

```java
/**
 * 定义：Bean 对象的 Class 以及属性信息
 * @author gusixue
 * @date 2023/3/26
 */
public class BeanDefinition {

    // Bean 对象的 Class
    private Class beanClass;

    // Bean 对象的所有属性信息
    private PropertyValues propertyValues;

    public BeanDefinition(Class beanClass, PropertyValues propertyValues) {
        this.beanClass = beanClass;
        this.propertyValues = propertyValues;
    }

... Getter、Setter、toString
}
```


#### 7. SimpleInstantiationStrategy JDK 实例化对象

```java
/**
 * 实现：创建有参 Bean 对象（无论是否有参），使用 JDK 反射
 * @author gusixue
 * @date 2023/3/27
 */
public class SimpleInstantiationStrategy implements InstantiationStrategy {

    /**
     * 通过 Cglib 代理实例化 Bean 对象
     * @param beanName Bean 对象唯一 id
     * @param beanDefinition 解耦封装 Bean 对象
     * @param ctor Bean 对象构造器
     * @param args Bean 对象参数
     * @return 实例化 Bean 对象
     * @throws BeansException 实例化 Bean 对象异常
     */
    @Override
    public Object instantiate(String beanName, BeanDefinition beanDefinition, Constructor ctor, Object[] args) throws BeansException {
        Object bean = null;

        Class clazz = beanDefinition.getBeanClass();

        try {
            if (null == args) {
                bean = clazz.getDeclaredConstructor().newInstance();

            } else {
                bean = clazz.getDeclaredConstructor(ctor.getParameterTypes()).newInstance(args);

            }
        } catch (IllegalAccessException | InstantiationException | NoSuchMethodException | InvocationTargetException e) {
            throw new BeansException("Failed to instantiate [" + clazz.getName() + "]", e);
        }

        return bean;
    }
}
```


#### 8. CglibSubclassingInstantiationStrategy Cglib 实例化对象

```java
/**
 * 实现：创建有参 Bean 对象（无论是否有参），使用 Cglib 代理
 * @author gusixue
 * @date 2023/3/27
 */
public class CglibSubclassingInstantiationStrategy implements InstantiationStrategy {

    /**
     * 通过 Cglib 代理实例化 Bean 对象
     * @param beanName Bean 对象唯一 id
     * @param beanDefinition 解耦封装 Bean 对象
     * @param ctor Bean 对象构造器
     * @param args Bean 对象参数
     * @return 实例化 Bean 对象
     * @throws BeansException 实例化 Bean 对象异常
     */
    @Override
    public Object instantiate(String beanName, BeanDefinition beanDefinition, Constructor ctor, Object[] args) throws BeansException {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(beanDefinition.getBeanClass());
//        enhancer.setCallback(new NoOp() {
//            @Override
//            public int hashCode() {
//                return super.hashCode();
//            }
//        });

        enhancer.setCallback(NoOp.INSTANCE);

        if (null == ctor) {
            return enhancer.create();
        }
        return enhancer.create(ctor.getParameterTypes(), args);
    }

}
```


#### 9. PropertyValue 定义对象的属性名与与属性值

```java
/**
 * 定义 Bean 对象的属性名与与属性值
 * @author gusixue
 * @date 2023/3/28
 */
public class PropertyValue {

    // Bean 对象属性名
    private String name;

    // Bean 对象具体属性值
    private Object value;

    public PropertyValue(String name, Object value) {
        this.name = name;
        this.value = value;
    }

... Getter、Setter、toString
}
```



参考：https://bugstack.cn/md/spring/develop-spring/2021-05-16-%E7%AC%AC1%E7%AB%A0%EF%BC%9A%E5%BC%80%E7%AF%87%E4%BB%8B%E7%BB%8D%EF%BC%8C%E6%89%8B%E5%86%99Spring%E8%83%BD%E7%BB%99%E4%BD%A0%E5%B8%A6%E6%9D%A5%E4%BB%80%E4%B9%88%EF%BC%9F.html