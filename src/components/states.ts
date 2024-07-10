export const state = {
  counter: 0,
  status: "",
};

export function updateCounter(newCounter: number) {
  state.counter = newCounter;
}

export function updateStatus(newStatus: string) {
  state.status = newStatus;
}
