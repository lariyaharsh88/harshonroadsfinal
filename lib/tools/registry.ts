import { toolDefinitions } from "@/lib/tools/definitions";
import { hasCalculatorModule } from "@/lib/tools/load-calculator";
import type { ToolDefinition } from "@/types/tool";

export function assertCalculatorWiring(definition: ToolDefinition): void {
  if (
    definition.status === "live" &&
    !definition.calculatorId &&
    !definition.interactiveKind
  ) {
    throw new Error(
      `Live tool "${definition.slug}" needs calculatorId or interactiveKind.`,
    );
  }
  if (
    definition.calculatorId &&
    !hasCalculatorModule(definition.calculatorId)
  ) {
    throw new Error(
      `Tool "${definition.slug}" points at unknown calculator "${definition.calculatorId}".`,
    );
  }
}

export function listRegisteredTools(): ToolDefinition[] {
  toolDefinitions.forEach(assertCalculatorWiring);
  return toolDefinitions;
}
