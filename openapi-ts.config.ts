import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig ({
    client: '@hey-api/client-fetch', 
    input: 'http://127.0.0.1:8080/q/openapi',
    output: 'src/lib/client',
  });