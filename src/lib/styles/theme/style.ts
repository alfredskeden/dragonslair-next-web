export const styles = {
  global: {
    ".is-foil::after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      background: `linear-gradient(
        115deg,
        rgba(0, 255, 0, 0) 0%,
        rgba(0, 255, 0, 0.25) 25%,
        rgba(255, 255, 0, 0.3) 50%,
        rgba(255, 0, 0, 0.15) 75%,
        rgba(255, 0, 0, 0.3) 100%
      )`,
      zIndex: "1",
      borderRadius: "0.375rem",
    },
  },
};
