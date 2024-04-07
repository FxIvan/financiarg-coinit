export default async function Payment({ params }) {
  const statusParams = params.id;
  return (
    <div className="">
      {statusParams === "success" ? "Pago correctamente" : "Pago fallido"}
    </div>
  );
}
