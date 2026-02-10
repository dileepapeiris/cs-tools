// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { describe, expect, it } from "vitest";
import {
  formatFileSize,
  getDeploymentStatusColor,
  getDeploymentAccentColor,
} from "@utils/deploymentsUtils";

describe("deploymentsUtils", () => {
  describe("formatFileSize", () => {
    it("should format bytes as B", () => {
      expect(formatFileSize(0)).toBe("0 B");
      expect(formatFileSize(100)).toBe("100 B");
    });

    it("should format bytes as KB", () => {
      expect(formatFileSize(1024)).toBe("1.00 KB");
      expect(formatFileSize(987738)).toMatch(/^\d+(\.\d+)? KB$/);
    });

    it("should format bytes as MB", () => {
      expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
      expect(formatFileSize(2453606)).toMatch(/^\d+(\.\d+)? MB$/);
    });

    it("should format bytes as GB for large values", () => {
      expect(formatFileSize(1024 * 1024 * 1024)).toBe("1.00 GB");
    });
  });

  describe("getDeploymentStatusColor", () => {
    it("should return success for Healthy", () => {
      expect(getDeploymentStatusColor("Healthy")).toBe("success");
      expect(getDeploymentStatusColor("healthy")).toBe("success");
    });

    it("should return warning for Warning", () => {
      expect(getDeploymentStatusColor("Warning")).toBe("warning");
      expect(getDeploymentStatusColor("warning")).toBe("warning");
    });

    it("should return default for unknown status", () => {
      expect(getDeploymentStatusColor("Unknown")).toBe("default");
      expect(getDeploymentStatusColor("")).toBe("default");
    });
  });

  describe("getDeploymentAccentColor", () => {
    it("should return blue for Production", () => {
      const color = getDeploymentAccentColor("Production");
      expect(color).toBeDefined();
      expect(typeof color).toBe("string");
    });

    it("should return purple for QA Environment", () => {
      const color = getDeploymentAccentColor("QA Environment");
      expect(color).toBeDefined();
      expect(typeof color).toBe("string");
    });

    it("should return orange for Development", () => {
      const color = getDeploymentAccentColor("Development");
      expect(color).toBeDefined();
      expect(typeof color).toBe("string");
    });

    it("should return grey for unknown environment", () => {
      const color = getDeploymentAccentColor("Staging");
      expect(color).toBeDefined();
      expect(typeof color).toBe("string");
    });
  });
});
