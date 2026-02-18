

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // You can validate the data here
    if (!body.name || !body.email || !body.phone) {
      return new Response(
        JSON.stringify({ message: "Missing required fields", status: 400 }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Here you would typically save to a database  
    console.log("Form data received:", body);
    
    return new Response(
      JSON.stringify({ message: "Data saved successfully", data: body, status: 200 }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error processing request", status: 500 }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}