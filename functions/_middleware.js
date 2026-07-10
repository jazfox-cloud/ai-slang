export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();
  let shouldRedirect = false;

  if (host === "www.ai-slang.com" || host === "aislanghub.com" || host === "www.aislanghub.com") {
    url.hostname = "ai-slang.com";
    shouldRedirect = true;
  }

  if (url.pathname.toLowerCase().endsWith(".html")) {
    url.pathname = url.pathname.toLowerCase() === "/index.html"
      ? "/"
      : url.pathname.slice(0, -5);
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
