// app/api/proxy/route.js

export async function GET(request) {
    const url = new URL(request.url);
    const apiUrl = url.searchParams.get("url");

    if (!apiUrl) {
        return new Response(
            JSON.stringify({ error: "Missing 'url' query parameter" }),
            { status: 400 }
        );
    }

    try {
        const response = await fetch(decodeURIComponent(apiUrl), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Add any necessary headers if required
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch from API: ${response.statusText}`);
        }

        const data = await response.json();

        // Return the response from the API
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                ...response.headers,
            },
        });
    } catch (error) {
        console.error("Error in proxy:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch data from external API" }),
            { status: 500 }
        );
    }
}


export async function POST(request) {
    const url = new URL(request.url);
    const apiUrl = url.searchParams.get("url");

    if (!apiUrl) {
        return new Response(
            JSON.stringify({ error: "Missing 'url' query parameter" }),
            { status: 400 }
        );
    }

    // Extract body from the request
    const requestBody = await request.json();

    try {
        const response = await fetch(decodeURIComponent(apiUrl), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Add any necessary headers if required
            },
            body: JSON.stringify(requestBody),  // Send the request body as JSON
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch from API: ${response.statusText}`);
        }

        const data = await response.json();

        // Return the response from the API
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                ...response.headers,
            },
        });
    } catch (error) {
        console.error("Error in proxy:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch data from external API" }),
            { status: 500 }
        );
    }
}

