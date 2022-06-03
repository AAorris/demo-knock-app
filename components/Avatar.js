export default function Avatar() {
  return <div style={{
      display: "grid",
      placeItems: "center",
      pointerEvents: "none",
    }}>
        <span style={{
            width: 32,
            height: 32,
            borderRadius: 20,
            background: 'linear-gradient(#f30096, #f30064)',
            color: "white",
            display: "grid",
            border: "2px solid black",
            placeItems: "center",
        }}>
            A
        </span>
    </div>;
}
