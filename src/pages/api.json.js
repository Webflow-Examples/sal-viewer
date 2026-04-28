const siteActivityLogs = async (site,token) => {
    const items = [];
    let offset = 0;
    const limit = 100;

    while (true) {
        let req = await fetch(`https://api.webflow.com/v2/sites/${site}/activity_logs?limit=${limit}&offset=${offset}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await req.json();
        items.push(...data.items);

        const { total } = data.pagination;
        offset += data.items.length;
        if (offset >= total) break;
    }

    return items;
}

export async function GET({ params, locals, request }) {

    const url = new URL(request.url);

    const siteId = url.searchParams.get('siteId');
    const logs = await siteActivityLogs(siteId, locals.access_token);
    let response = {
        status:'OK',
        logs
    };

    return new Response(
        JSON.stringify(response)
    );
}