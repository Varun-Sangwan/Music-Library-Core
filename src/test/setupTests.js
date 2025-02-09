import "@testing-library/jest-dom";
import util from "util";

// ✅ Ensure TextEncoder and TextDecoder are available for Jest
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = util;
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
