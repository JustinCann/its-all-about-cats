import { useBreakpoint } from "./useBreakpoint";

/**
 * Returns the number of columns to use for the grid based on the current breakpoint
 */
export const useCols = () => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case "xs":
      return 1;
    case "sm":
      return 2;
    case "md":
    case "lg":
      return 3;
    case "xl":
      return 4;
    default:
      return 1;
  }
};
