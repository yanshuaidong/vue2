initToolTip() {
  // key certainlyNeverTip
  // value 12423516754certainlyNeverTip
  let curToolTipHideFlag = '';
  let locToolTipHideFlag = '';
  if (this.memberInfo && this.memberInfo.userId) {
    curToolTipHideFlag = this.memberInfo.userId + 'certainlyNeverTip';
  }
  if (localStorage.getItem('certainlyNeverTip')) {
    locToolTipHideFlag = localStorage.getItem('certainlyNeverTip');
  }
  if (curToolTipHideFlag == locToolTipHideFlag) {//如果当前用户的提示隐藏标识和本地存储的一致，则不显示提示
    this.neverTip = true;
  } else {
    this.neverTip = false;
  }
},
neverTipHandler() {
  console.log('关闭提示');
  // key certainlyNeverTip
  // value 12423516754certainlyNeverTip
  // 关闭提示
  this.neverTip = true;
  // 存储那个用户永远关闭了提示
  if (this.memberInfo && this.memberInfo.userId) {
    localStorage.setItem('certainlyNeverTip', this.memberInfo.userId + 'certainlyNeverTip');
  }
},