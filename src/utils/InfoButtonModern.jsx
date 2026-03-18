import { useState, useRef, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function InfoButtonModern({ title, content }) {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef();

  // Cerrar tooltip al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={tooltipRef} style={{ position: "relative", display: "inline-block" }}>
      {/* Botón circular con icono */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: "#3a6ea5",
          border: "none",
          borderRadius: "50%",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white", // color del icono
          padding: 0,
          transition: "transform 0.2s, background-color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        aria-label={title}
      >
        {/* Icono de info forzado en blanco */}
        <AiOutlineInfoCircle size={16} color="white" />
      </button>

      {/* Tooltip animado */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "120%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#1F2937",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: 8,
            whiteSpace: "normal",
            width: 220,
            fontSize: 14,
            boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
            animation: "fadeIn 0.2s ease-in-out",
            zIndex: 1000,
          }}
        >
          <strong style={{ display: "block", marginBottom: 4 }}>{title}</strong>
          <span>{content}</span>
        </div>
      )}

      {/* Animación */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, 10%); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
        `}
      </style>
    </div>
  );
}