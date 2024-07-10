import { state, updateCounter, updateStatus } from "./components/states";

export function resetGame(boxs: HTMLDivElement[]) {
  setTimeout(() => {
    boxs.forEach((box) => {
      box.innerHTML = "";
      box.style.backgroundColor = "";
      box.style.color = "";
    });
    updateCounter(0);
    if (state.status !== '') { 
      alert(state.status);
    }
    updateStatus("");
  }, 20);
}
