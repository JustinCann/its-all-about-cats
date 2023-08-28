import { Breakpoint, Theme, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

type BreakpointOrNull = Breakpoint | null;

/**
 * Hook that returns the current width of the screen as an MUI breakpoint.
 */
export const useBreakpoint = (): Breakpoint => {
  const theme: Theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
};
