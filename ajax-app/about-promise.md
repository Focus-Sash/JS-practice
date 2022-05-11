### 基本
`Promise`は、非同期処理を扱うためのもの。

### コンストラクタ・then・catch
`Promise`のコンストラクタは`(resolve, reject) => T f(resolve, reject)`という形の関数を引数にとる。イメージは、
```javascript
void f(resolve, reject) {
    if(success) {
    resolve(val_success);
  } else {
    reject(val_fail);
  }
}
```
という感じの関数だが、必ずしもこうでなくてよい。`Promise`インスタンスは`resolve`と`reject`の情報を持っていることになる。

`Promise`インスタンスの`then(onFulfilled, onRejected)`メソッドには、それぞれ`resolve/reject`と同じ型の引数を取る関数を引数として渡す。`then(onFulfilled, onRejected)`が実行されたとき、`f(onFulfilled, onRejected)`が実行される。`onFulfilled`と`onRejected`はどちらも省略できる。省略した場合は`undefined`が暗黙に引数として代入される。`onFulfilled`を省略する場合は、わかりやすいように`catch(onRejected)`を用いるのが望ましい。

`Promise.resolve`メソッドは、`new Promise`の糖衣構文。
```javascript
const promise = Promise.resolve();
```
は、
```javascript
const promise = new Promise((resolve) => {
  resolve();
});
```
と等価。

### 例外処理
`Promise`インスタンスのコンストラクタで例外が発生した場合、自動的に`reject`が呼ばれる、すなわち、`catch`で渡された関数が呼ばれる。


### チェーン
`Promise.then(onFulfilled, onRejected)`は、`Promise`インスタンスを返す。したがって、次のようなコードを考えたとき、
```javascript
const promise = new Promise((resolve, reject) => f(resolve, reject));
promise
  .then(g, undefined)
  .then(h, undefined);
```
まず1つめの`then()`によって`f(g, undefined)`が実行され、その返り値を引数に取る形で`h`が実行される[^1]。

### 非同期処理との関係
`Promise`チェーンの処理は、チェーンの順番に処理される。また、`Promise.all()`や`Promise.race()`を用いて処理を行うタイミングを調整することもできる。

### async/await
`Promise`まわりを簡潔に書けるようになるsyntactical sugar。
```javascript
async function f() {
  return val;
} 
// async関数はPromiseを返す
f().then(x => {
  console.log(x);
});
```
と書くと、以下と同じ意味になる。
```javascript
function f() {
  return Promise.resolve(val);
} 
// async関数はPromiseを返す
f().then(x => {
  console.log(x);
});
```

`await`は、async functionの直下で用いることができる構文で、`await`を頭につけた文の処理が終わるまで、次の文の処理に進まない。非同期処理が上から書けてえらい。
[^1]: `then()`が返す`Promise`インスタンスが、コンストラクタに何を渡したものかわかっていないので理解があいまい。