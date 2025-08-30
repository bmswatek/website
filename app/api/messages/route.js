let messages = ["First entry: welcome to the hidden blog"]; // in-memory store for simplicity

export async function GET() {
  return new Response(JSON.stringify(messages), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(req) {
  const { id } = await req.json();
  if (!id) {
    return new Response(JSON.stringify({ error: "No id provided" }), {
      status: 400,
    });
  }

  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
