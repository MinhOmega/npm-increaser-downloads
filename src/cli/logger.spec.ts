import { addSeconds } from "date-fns";

import { MOCK_START_TIME, setMockConfig } from "../../test-utils/mock-config";
import { getMockStats, setCurrentDate } from "../../test-utils/mock-stats";
import { Stats } from "../models/stats.model";

import { logDownload, mapToDate, mapToString, terminalSpinner } from "./logger";

describe("logger", () => {
  beforeEach(() => {
    setMockConfig();
  });

  afterEach(() => {
    // Prevents tests from hanging due to terminalSpinner
    terminalSpinner.stop();
  });

  describe("mapToString()", () => {
    it("if num=100, returns '100'", () => {
      expect(mapToString(100)).toEqual("100");
    });

    it("if num=0, returns '0'", () => {
      expect(mapToString(0)).toEqual("0");
    });

    it("if num=-100, returns '-100'", () => {
      expect(mapToString(-100)).toEqual("-100");
    });

    it("if num=123.456, returns '123.46'", () => {
      expect(mapToString(123.456)).toEqual("123.46");
    });

    it("if num=0.0, returns '0'", () => {
      expect(mapToString(0.0)).toEqual("0");
    });

    it("if num=-123.456, returns '-123.46'", () => {
      expect(mapToString(-123.456)).toEqual("-123.46");
    });
  });

  describe("mapToDate()", () => {
    it("if num=12345s, returns '03:25:45'", () => {
      expect(mapToDate(12345)).toEqual("03:25:45");
    });

    it("if num=1234567s, returns '342:56:07'", () => {
      expect(mapToDate(1234567)).toEqual("342:56:07");
    });

    it("if num=0s, returns '00:00:00'", () => {
      expect(mapToDate(0)).toEqual("00:00:00");
    });

    it("if num=-100s, returns '--:--:--'", () => {
      expect(mapToDate(-100)).toEqual("--:--:--");
    });

    it("if num=null, returns '--:--:--'", () => {
      expect(mapToDate(null)).toEqual("--:--:--");
    });
  });

  describe("logDownload()", () => {
    beforeEach(() => {
      setCurrentDate(addSeconds(MOCK_START_TIME, 1));
    });

    // Fails in certain environments - https://github.com/jest-community/vscode-jest/issues/732
    it.skip("starts the terminal spinner", () => {
      expect(terminalSpinner.isSpinning).toEqual(false);
      logDownload(getMockStats());
      expect(terminalSpinner.isSpinning).toEqual(true);
    });

    // Fails in certain environments - https://github.com/jest-community/vscode-jest/issues/732
    it.skip("if terminal spinner already started, it continues", () => {
      terminalSpinner.start();
      expect(terminalSpinner.isSpinning).toEqual(true);
      logDownload(getMockStats());
      expect(terminalSpinner.isSpinning).toEqual(true);
    });

    it("if downloadSpeed=1dl/s and timeRemaining=9s, logs expected result", () => {
      const stats = new Stats(MOCK_START_TIME, 1, 0);
      logDownload(stats);

      expect(stats.getDownloadSpeed()).toEqual(1);
      expect(stats.getTimeRemaining()).toEqual(9);

      expect(terminalSpinner.text).toEqual(
        `\n` + `Download count:            1/10\n` + `Download speed:            1 dl/s\n` + `Estimated time remaining:  00:00:09\n`,
      );
    });

    it("if downloadSpeed=0dl/s and timeRemaining=null, logs expected result", () => {
      const stats = new Stats(MOCK_START_TIME, 0, 1);
      logDownload(stats);

      expect(stats.getDownloadSpeed()).toEqual(0);
      expect(stats.getTimeRemaining()).toEqual(null);

      expect(terminalSpinner.text).toEqual(
        `\n` + `Download count:            0/10\n` + `Download speed:            0 dl/s\n` + `Estimated time remaining:  --:--:--\n`,
      );
    });

    it("if all values set to 0, logs expected result", () => {
      setCurrentDate(new Date(MOCK_START_TIME));

      const stats = new Stats(MOCK_START_TIME, 0, 0);
      expect(stats.getDownloadSpeed()).toEqual(0);
      expect(stats.getTimeRemaining()).toEqual(null);

      logDownload(stats);
      expect(terminalSpinner.text).toEqual(
        `\n` + `Download count:            0/10\n` + `Download speed:            0 dl/s\n` + `Estimated time remaining:  --:--:--\n`,
      );
    });
  });
});
