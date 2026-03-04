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

import { useAsgardeo } from "@asgardeo/react";

/**
 * A custom hook that returns a smart `fetch` wrapper.
 * It automatically fetches a fresh ID Token from Asgardeo,
 * and merges the Authorization Header alongside the necessary payload descriptors.
 *
 * @returns {typeof GlobalFetch.fetch} A decorated `fetch` API.
 */
export function useAuthApiClient() {
  const { getIdToken } = useAsgardeo();

  const authFetch = async (
    input: RequestInfo | URL,
    options?: RequestInit,
  ): Promise<Response> => {
    // 1. Get the fresh token automatically
    const token = await getIdToken();

    // 2. Format headers
    const defaultHeaders: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      "x-user-id-token": token,
      Accept: "application/json",
    };

    // If method is POST, PUT, or PATCH, attach JSON Content-Type
    const method = options?.method?.toUpperCase();
    if (method === "POST" || method === "PUT" || method === "PATCH") {
      defaultHeaders["Content-Type"] = "application/json";
    }

    // Include any overrides specified in individual calls
    if (options?.headers) {
      Object.assign(
        defaultHeaders,
        options.headers instanceof Headers
          ? Object.fromEntries(options.headers.entries())
          : options.headers,
      );
    }

    // 3. Execute the native fetch
    return fetch(input, { ...options, headers: defaultHeaders });
  };

  return authFetch;
}
