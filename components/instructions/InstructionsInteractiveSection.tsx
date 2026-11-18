"use client";

import { useState } from "react";
import InstructionsCTA from "./InstructionsCTA";
import ReadinessConfirmation from "./ReadinessConfirmation";

export default function InstructionsInteractiveSection() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <ReadinessConfirmation onReadyChange={setReady} />
      <InstructionsCTA ready={ready} />
    </>
  );
}
