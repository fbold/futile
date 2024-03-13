import { JsonValue } from "@prisma/client"
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./lib/lucia.ts").Auth
  type DatabaseUserAttributes = {
    username: string
  }
  type DatabaseSessionAttributes = {}
}

/// <reference types="templater" />
export type TemplateProps = {
  content: JsonValue
}
