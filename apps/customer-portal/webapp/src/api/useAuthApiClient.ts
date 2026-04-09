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
 * Builds a Headers object with auth headers attached.
 */
function buildAuthHeaders(token: string, base?: HeadersInit): Headers {
  const headers = new Headers(base);
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("x-user-id-token", token);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }
  return headers;
}

/**
 * Smartly sets Content-Type: application/json for mutating requests
 * unless the body is a non-JSON type.
 */
function applyContentType(
  headers: Headers,
  method: string,
  body: BodyInit | null | undefined,
): void {
  if (["POST", "PUT", "PATCH"].includes(method) && body) {
    const isNonJsonType =
      body instanceof FormData ||
      body instanceof Blob ||
      body instanceof ArrayBuffer ||
      (typeof URLSearchParams !== "undefined" &&
        body instanceof URLSearchParams);

    if (!isNonJsonType && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }
}

/**
 * A custom hook that returns a smart `fetch` wrapper.
 * It automatically fetches a fresh ID Token from Asgardeo and attaches
 * the Authorization and x-user-id-token headers to every request.
 *
 * On a 401 response the hook forces a token refresh (by calling getIdToken()
 * again) and retries the request once. If the retry also returns 401 the
 * user is signed out immediately — matching the mealsapp auth pattern.
 *
 * @returns {typeof GlobalFetch.fetch} A decorated `fetch` API.
 */
export function useAuthApiClient() {
  const { getIdToken, signOut } = useAsgardeo();

  const authFetch = async (
    input: RequestInfo | URL,
    options?: RequestInit,
  ): Promise<Response> => {
    const method = options?.method?.toUpperCase() ?? "GET";
    const body = options?.body;

    const token = await getIdToken();

    if (!token) {
      throw new Error("Unable to retrieve ID token");
    }

    const headers = buildAuthHeaders(token, options?.headers);
    applyContentType(headers, method, body);

    const response = await fetch(input, { ...options, headers });

    if (response.status === 401) {
      let refreshedToken: string | undefined;

      try {
        refreshedToken = await getIdToken();
      } catch {
        await signOut();
        return response;
      }

      if (!refreshedToken) {
        await signOut();
        return response;
      }

      const retryHeaders = buildAuthHeaders(refreshedToken, options?.headers);
      applyContentType(retryHeaders, method, body);

      const retryResponse = await fetch(input, {
        ...options,
        headers: retryHeaders,
      });

      if (retryResponse.status === 401) {
        await signOut();
      }

      return retryResponse;
    }

    return response;
  };

  return authFetch;
}
