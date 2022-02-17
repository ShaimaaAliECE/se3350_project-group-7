import LevelLayout from "./LevelLayout";
import React from "react";

const Level1 = () => {
  return (
    <LevelLayout
      headingText="Level 1: Sorting Demonstration"
      showInstructions={true}
      showInput={false}
      showAttempts={false}
    />
  );
};

export default Level1;
