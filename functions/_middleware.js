export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  if (host === "www.ai-slang.com" || host === "aislanghub.com" || host === "www.aislanghub.com") {
    url.hostname = "ai-slang.com";
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
