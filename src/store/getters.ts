/*
  这里面定义所有页面需要的展示数据，具体的内容根据具体组件要求来定义
 */ 
export default {
  token: (state: { token: string }) => state.token,
  getage:(state: { age: number }) => state.age
};
