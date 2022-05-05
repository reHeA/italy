export default {
  setToken(state: { token: string }, value: string) {
    state.token = value;
  },
  add(state: { age: number }) {
    state.age += 1;
  }
};
