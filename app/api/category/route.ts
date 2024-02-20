export function GET() {
  const category: ICategoryModel[] = [
    { id: 1, name: "wedding" },
    { id: 2, name: "music" },
    { id: 3, name: "branding" },
    { id: 4, name: "brithday" },
  ];
  return Response.json({ category });
}
