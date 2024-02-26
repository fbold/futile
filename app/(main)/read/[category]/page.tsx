export default function Read({ params }: { params: { category: string } }) {
  return <div>{params.category}</div>
}
