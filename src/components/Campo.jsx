// Envuelve etiqueta + control + ayuda/error, con los atributos de accesibilidad conectados.
export default function Campo({ id, etiqueta, ayuda, error, children }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{etiqueta}</label>
      {children}
      {error ? (
        <p className="mensaje mensaje--error" id={`${id}-msg`} role="alert">
          {error}
        </p>
      ) : (
        ayuda && (
          <p className="mensaje" id={`${id}-msg`}>
            {ayuda}
          </p>
        )
      )}
    </div>
  );
}
