export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  }
}
