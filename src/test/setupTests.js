import "@testing-library/jest-dom";
import util from "util";

if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = util;
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
