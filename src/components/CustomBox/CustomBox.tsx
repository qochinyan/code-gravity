import type { ReactNode } from "react";
import "./CustomBox.scss";

export default function CustomBox({ customClass, children }: { customClass?: string; children: ReactNode }) {
  return <div className={`custom-box__container ${customClass}`}>{children}</div>;
}
