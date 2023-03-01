// 6、新建好了文件，当然别忘了我们新建这个文件的目的，做数据劫持，响应式数据。
class Observer{
  constructor(data){
    // new 对象的时候会走到这里。
    if(Array.isArray(data)){
      data.__proto__ = {
        push(){
          console.log('11111');
        }
      }
      this.observeArray()
    }else{
      this.walk(data);
    }
  }
  walk(data){//循环对象对属性依次劫持。
    // 重新定义属性
    Object.keys(data).forEach(key => {
      defineReactive(data,key,data[key])    
    });
  }
  // 
  observeArray(data){
    data.forEach(item => {
      observe(item)
    })
  }
}
// 劫持属性
export function defineReactive(target,key,value){
  observe(value)
  Object.defineProperty(target,key,{
    get(){
      return value;
    },
    set(newValue){
      if(newValue === value) return ;
      observe(newValue)
      value = newValue;
    }
  })
}

export function observe(data){
  // 7、一个好的模块需要首先需要对输入的数据做判断。如果输入的数据不是对象，我们就跳出当前方法。上一层。
  if(typeof data !== "object" || data == null){return}
  // 8、第二个要考虑的点就是不做重复工作，如果一个对象已经被劫持了，我们就不做劫持了。浏览器没有给我们这样的api，官方替我们是靠了一种办法，用实例来判断是否被劫持过。
  
  // 9、我们需要创建一个类，用来观测数据如果数据被观测过，那么实例就是这个类。这听起来很怪。
  return new Observer(data);
}
// 里面会传入一个数据，先明确，我们是把数据的引用空间传递过来了。
// observe 方法有了data，我们需要对这个对象进行劫持。但是也有一些特殊情况，比如不是对象，就没有办法劫持。所以里面我们需要判断一下，传来的数据是对象我们才能劫持。
// 看当前对象的 typeof 不是 object 或者 data 是null ，里面直接return，只对对象进行劫持。那怎么劫持对象呢？那么如何对一个对象进行劫持？如果一个对象被劫持过了，
// 那就不需要再被劫持。那我们要判断一个对象是否被劫持，我们可以用到一个方式，可以增添一个实例，用实例来判断是否被劫持过。所以vue作者在内部创建了一个类，这个类是专门观测数据的。
// 如果数据被观测过，那么实例就是这个类，对data进行观测。里面就是class 观测类。构造方法上用户会传入待观测数据，类内，我们要把这个对象的每个属性都劫持。所以这个里面有个很严重的问题。
// 我们的Object。defentproptype只能劫持已经存在的数据。后增加的，或者删除的是观测不到的。objetc.defentProptype的语法是什么，Object.defineProperty(tatget,prop,handler) new Proxy(target,handler),一个是代理属性，一个在代理对象。
// vue2会为此单独写一些api，比如说$set/$delete，十分痛苦。因为传入的数据data是个对象，所以我们需要遍历这个对象data，专门写个功能吧data一传，类里写函数this。wakl，吧data的引用空间传入。有类的好处就是方便扩展。
// walk在构造的时候执行，就是在new Observe（data）的时候执行。wakl方法我们需要循环对象，对属性依次劫持。walk方法中，Object。keys（data）得到对象的数组。使用foreach方法（）我们就可以拿到data中的一个个key了，拿到key后可以对这个对象重新定义这个属性。明确是重新定义属性，重新定义会导致性能差。重新定义相当于把属性重写了一遍。
// 对于循环出来的key我们写一个方法，把我们我们的某个数据定义成响应式的，定义的target是data，prop是key，值是data【key】。
// 此方法可以单独使用，所以我们不定义在观察对象上。所以我们导出这个方法，此方法是一个公告api，方法的作用就是重写对象的某个属性，让其变成像响应式的。Reactive就是响应式的意思。
// defineReactive，defineReactive方法的第一个参数就是你要重新定义的是谁？二三是key，和value。将当前的目标属性进行重新定义成响应式的。observe对象的walk方法是循环对象，循环的时候调用了公共api，defineReactive的api，是重新定义属性。
// 内部就很明显的可以用defineProptype方法，定义目标上的属性，handler对象可以增加两个方法，get/set。取值的时候会执行get，修改的时候会执行set。我们就能拦截到用户的操作。有个问题，当我们要取值的时候我们return value。当我们要设置值的时候，让value等于set方法传入的newval，如果值一样我们就不用管了 前面加个判断，newval === 等于value的时候return。强等于。完全等于的时候才不赋值。给value。
// 这里存在闭包，get方法和set方法都能拿到value属性。当前函数defineReactive的作用域执行栈并没有被销毁，我们里面的get和set函数可以拿到里面的value值。这里的value理解为存放了闭包。value并不销毁。当行完后，我们就将data的所有属性都重新定义了一遍。我们看一下被劫持后的属性。
// 我们打印vm，但是vm上什么都没有。我们取值用的value，设置也是设置到value上，闭包上，等于defineProptype使用了外部函数的变量，所以这个变量并不能被销毁，相当于是个闭包。vm上只有用户的选项，并没有我们刚才劫持过的属性。
// 我们在调用observe方法的时候只是将data的命名空间传入了，我们考虑在vm上增加一个属性，_data，我们将data赋值给vm._data这样vm上就有了_data就指向同一个命名空间（堆空间）。 我们将对象放在实例上，并对对象进行了观测。
// 我们可以通过在栈中找vm._data.name来访问我们已经劫持过了的对象（在堆中），但是很恶心。我们希望vm.name来访问。当用户去vm上取值，我就帮你代理到vm._data上取值。我们用vm代理一下vm._data就可以了
// 那如何代理呢，我们希望在vm上写一个方法proxy，proxy（vm，属性，data）
// 在外卖呢勋啊，
// propy中使用，提前循环data，将data中的属性重新代理（劫持），触发get的时候我们从return vm【target】【key】//当我们从
// 所以我们是代理了两次，第一次我们将用户的数据进行了属性劫持，第二次是个代理，当我们取某个值当时候，代理到某个人的身上，
// 这样写只会监控第一层。并不会监控里对象里面的属性。如果我们的value可能是个对象。再次调用observe方法。将value放入。这个在方法defineReactive方法内，调用observe方法。如果value是对象，调用observe方法，再次对这个对象做一次
// new observe（）开辟一片堆空间，再次建立一个数据劫持。对所有的对象进行数据劫持。如果不是对象就返回上一层。
// 核心就是循环对象，给对象使用defineReactive把属性重新定义，如果值还是对象的话。我们对对象进行递归操作。这样我们就可以监控到用户的取值与赋值。当你去vm取值，我们从vm._data中去找。
// 实现对属性的劫持，深度属性劫持。


// 如果是个对象的话我们需要再次代理，当用户vm.address = {name:'jack'} 这样其实是合法的。这样做，我们传的是个对象了，走到set方法中，我们就对它再次代理。我们之前有address，然后我们对address重新赋值了。
// 在设置值的时候需要加一个这样的操作。但是如果data中有数组呢？我们并不是没有代理数组，而是对数组的每个属性进行了代理。这就导致了一个问题，如果数组很大，我们需要改很多，用户很少使用vm.hobby[11] = 12这种形式的代码来改数据。这种情况很少，我们修改数组很少用索引去修改。但是内部做劫持会浪费性能。
// 用户一般修改数组，都是通过方法来修改的，比如push，shift等。
// 所以我们考虑，如果是数组，我们就不循环去做每个属性的劫持了，而是，我们在构造对象的时候，就是new observe（）的时候，在遍历之前，在walk方法运行前，提前判断传入的数据是否是数组，if（Array。isArray（data））做处理，不是数组就走wakl方法。对每个属性都代理。如果是数组。我们无非就是监控用户有没有调用数组的原生方法。
// 这样我们就可以重写数组的方法。一共有7个变异方法。为什么说是变异方法，因为这几个方法是可以修改数组本身的。对于vm.hobby.push('1')方法。出啦正常的数组外，我们还有数组里面嵌套对象的 
// 是数组要做的两件事：
// 1、修改数组。vm.hobby.push('1')。要更新
// 2、将数组中的引用类型劫持。 比如vm.hobby[2].a = 100这种操作我们也要更新
// 是数组的话我们希望对数组中的每一个值进行观测。无论是如何嵌套。
// 定义方法observeArray方法。在是数组的情况下调用这个方法。吧当前的数据传过来。里面直接data。foreach（）拿到每一项，拿到每一项之后，在再次对遍历出来的item调用observe方法。对对象进行劫持
// 当前数组上的所有方法。咋重写呢？在Array。isarrgy（data）等于true重写一个对象，data。————propto———— = 里面增加一些方法，比如push。我们给当前数组的原型链，重新指向了一个新的原型对象。
// 我们还希望能保留原本的push，只是在原本的push方法上加强。保留数组原有的特性，重写部分方法。
// 单独建立一个文件array。js希望重写数组中的部分方法。把重写后的对象返回，就可以了。
// 我们要拿到数组的原来的那些内容，咱们拿到呢？数组的原型。我们需要拿到老的数组的原型。
// let oldarrayproptype = Array。prototype；获取数组的原型。但是我们不能直接去修改。如果
// Array。prototype。push = function(){} 这样就把原来的push方法给干掉了。
// 换一种扩展方式：object.create(oldarrayproptype) 这样我们就生成了一个新的数组的方法。
// 这样newArrayproto。--proto-- 等于 oldarrayproptype
// 我们取的方法依然可以在上面取，我们加newArrayProto.push = function(){}一个方法是加在newArrayProto实例上的，并没有改变oldArrayProto（数组原型）上的方法。
// 所以不用担心被覆盖掉  有哪些方法会,找到所有的变异方法。reverse反序，sort排序，splice删除，七个变异方法。
// let methods = [
//   'push',
//   'pop',
//   'shift',
//   'unshift',
//   'reverse',
//   'sort',
//   'splice',
// ]
// newArrayProto.push = function(){}
// 后面的concat和slice都不会改变原来数组。只有着七个方法可以改变原来数组，这点需要注意
// 我们要重写这些变异方法，（会改变原数组的方法）。在newArrayProto实例对象上增加这个方法
// 里面调用原来的方法。我们掉push，掉pop都需要追加一下，所以内部其实都一样，在原来的里 oldArrayProto
// 掉用新的，默认调用原来的，
// 我们调用的时候需要把参数传入，比如我们调用arr。push（1，2，3），这时候参数在...args,我们应该传给原生的方法
// oldArrayProto[method]这样调用等于我们调用push执行了,改回来this。后面的参数呢？放进去。

methods.forEach(method =>{
  newArrayProto[method] = function(...args){
    oldArrayProto[method].call(this,...args)
  }
})





