import React from "react";
import { Spin } from "antd";

export default function Loading() {
  return (
    <div
      className="fixed flex items-center justify-center"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        background: "rgba(0, 0, 0, 0.25)",
        position: "absolute",
        textAlign: "center",
        lineHeight: "800px",
      }}
    >
      <Spin />
    </div>
  );
}
