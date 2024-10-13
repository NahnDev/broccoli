import { Board } from "./board/Board";
import { BoardWrapper } from "./board/Wrapper";

export function Builder() {
  return (
    <BoardWrapper>
      <Board />
    </BoardWrapper>
  );
}
