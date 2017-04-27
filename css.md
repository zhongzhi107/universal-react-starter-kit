# CSS 编码规范

## 技术
- [less](http://lesscss.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)

## 关键技术概念
在 `CSS Modules` 中引入了样式类作用域（`scope`）的概念，作用域有2种类型：
- **global**：全局样式，编译时会保存原有样式类名称
- **local**：局部样式，编译时会按配置的规则 *重命名* 样式名称，这样做的好处是能保证样式名称的唯一性，避免 CSS 样式冲突，坏处是增加了编译时间和文件 size

接下来说说 `less`, `less` 有个嵌套语法，编译时能根据嵌套关系生成对应的选择器
```css
.home {
  .banner {
    .close {
      // ...
    }
  }
}
```
上面的代码会生成 `.home .banner .close` 的样式。这样做的目的和上面 `CSS Modules` 的 `local` 差不多，在一定程度上可以保证样式的唯一性，当然，这种唯一性比 `local` 输出的样式要差一些；坏处也和 `local` 一样——增加了编译时间和文件 size

如何在系统设计时既能保证开发体验，又能避免页面的样式冲突呢？

最终选择是结合 `CSS Modules` 和 `less`，对这2种技术部分使用
- 对顶层样式使用 `CSS Modules` 的 `local`，保证顶层样式的唯一性
- 对页面子样式使用 `less` 单层嵌套，确保子样式只在顶层样式范围内是全局的
- 编译后的 CSS 文件 size 不会增加太大

## 编码规范
- 样式类名称使用驼峰命名法，这样做能方便在 JSX 中用 `.` 的方式调用

  ```js
  /*** bad ***/
  // Home.less
  .download-banner {
    // ...
  }

  // Home.js
  import s from './Home.less';

  class Home extends Component {
    render() {
      return (
        <div className={s['download-banner']}></div>
      )
    }
  }

  /*** good ***/
  // Home.less
  .downloadBanner {
    // ...
  }

  // Home.js
  import s from './Home.less';

  class Home extends Component {
    render() {
      return (
        <div className={s.downloadBanner}></div>
      )
    }
  }
  ```

- 每个页面必须设置一个页面顶层样式，页面顶层样式的名称必须和页面路由对应

  ```css
  /*** bad ***/
  // home页面的顶层样式
  .index {
    // ...
  }

  /*** bad ***/
  // hotel/detail页面的顶层样式
  .hotel-detail {
    // ...
  }

  /*** good ***/
  // home页面的顶层样式
  .home {
    // ...
  }

  /*** good ***/
  // hotel/detail页面的顶层样式
  .hotelDetail {
    // ...
  }

  ```

- 页面中的子样式类必须包含在顶层样式花括号内部，而且子样式类和顶层样式有且只有一层嵌套，页面中的子样式类必须包含在 `:global` 伪类中

  ```css
  /*** bad ***/
  .home {
    color: #000;

    .banner {

      .close {
        // ...
      }

    }
  }

  /*** good ***/
  // 顶层样式
  .home {
    color: #000;

    :global {
      .banner {}
      .close {}
    }

  }
  ```

- 在 JSX 引用时，只需要对顶层样式使用 import 导入的类名称，页面子样式直接使用全局的样式名称即可

  ```css
  /* Home.less */
  .home {
    color: #000;

    :global {
      .banner {}
      .close {}
    }

  }
  ```

  ```js
  // Home.js
  import s from './Home.less';

  class Home extends Component {
    render() {
      return (
        <div className={s.home}>
          <div className="banner">
            <i className="close"></i>
          </div>
        </div>
      )
    }
  }
  ```
