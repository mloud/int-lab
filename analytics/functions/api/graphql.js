export async function onRequestPost(context) {
  // Získáme token z proměnných prostředí nastavených v Cloudflare
  const apiToken = context.env.NEXT_PUBLIC_CF_API_TOKEN;

  if (!apiToken) {
    return new Response(JSON.stringify({ error: "Missing API Token" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Získáme GraphQL dotaz od našeho klienta (frontend)
  const body = await context.request.text();

  // Přepošleme ho přímo na Cloudflare API, tentokrát ze serveru (žádný CORS problém)
  const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiToken}`
    },
    body: body
  });

  const result = await response.text();

  // Pošleme výsledek zpět našemu frontendu
  return new Response(result, {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
