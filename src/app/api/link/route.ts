import axios from 'axios';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const href = url.searchParams.get('url');
  console.log('log1=====url', url);
  console.log('log2=====href', href);

  if (!href) {
    return new Response('Invalid href', { status: 400 });
  }

  const res = await axios.get(href);
  console.log('log3=====res', res.data);

  const titleMatch = res.data.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';

  const descriptionMatch = res.data.match(
    /<meta name="description" content="(.*?)">/
  );
  const description = descriptionMatch ? descriptionMatch[1] : '';

  const imageMatch = res.data.match(
    /<meta property="og:image" content="(.*?)">/
  );
  const imageUrl = imageMatch ? imageMatch[1] : '';

  return new Response(
    JSON.stringify({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: imageUrl,
        },
      },
    })
  );
}
